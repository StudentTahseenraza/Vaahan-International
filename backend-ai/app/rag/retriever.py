from app.db.mongodb import chunks_collection
from app.rag.embedder import embed_query

import numpy as np


# Proactively build text index for keyword search
try:
    chunks_collection.create_index([("title", "text"), ("chunk_text", "text")], name="text_search_index")
except Exception as e:
    print(f"[WARNING] Could not create text index: {e}")

def cosine_similarity(a, b):
    return np.dot(a, b) / (
        np.linalg.norm(a)
        * np.linalg.norm(b)
    )

def retrieve(query, top_k=5):
    # Step 1: Run Vector Search
    query_vector = embed_query(query)[0].tolist()
    vector_results = []
    try:
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "vector_index",  
                    "path": "embedding",
                    "queryVector": query_vector,
                    "numCandidates": top_k * 10,
                    "limit": top_k * 2
                }
            }
        ]
        vector_results = list(chunks_collection.aggregate(pipeline))
        # Filter vector search results to only keep active chunks
        vector_results = [doc for doc in vector_results if doc.get("is_active", True) is True]
    except Exception as e:
        print(f"[WARNING] Vector search failed: {e}. Falling back to in-memory cosine similarity.")
        # Fallback to in-memory cosine similarity (already filters by is_active)
        all_chunks = list(chunks_collection.find({"is_active": True}))
        if all_chunks:
            scored = []
            for doc in all_chunks:
                sim = cosine_similarity(query_vector, doc["embedding"])
                scored.append((sim, doc))
            scored.sort(key=lambda x: x[0], reverse=True)
            vector_results = [doc for _, doc in scored[:top_k * 2]]

    # Step 2: Run Keyword Search
    keyword_results = []
    try:
        # Search text index only for active chunks
        keyword_results = list(chunks_collection.find(
            {"$text": {"$search": query}, "is_active": True},
            {"score": {"$meta": "textScore"}}
        ).sort([("score", {"$meta": "textScore"})]).limit(top_k * 2))
    except Exception:
        # Regex search fallback if text search fails or indices are missing
        keywords = [kw for kw in query.split() if len(kw) > 2]
        if keywords:
            regex_queries = [{"chunk_text": {"$regex": kw, "$options": "i"}} for kw in keywords]
            keyword_results = list(chunks_collection.find({"$or": regex_queries, "is_active": True}).limit(top_k * 2))
        else:
            keyword_results = list(chunks_collection.find({
                "$or": [
                    {"title": {"$regex": query, "$options": "i"}}, 
                    {"chunk_text": {"$regex": query, "$options": "i"}}
                ],
                "is_active": True
            }).limit(top_k * 2))

    # Step 3: Reciprocal Rank Fusion (RRF)
    merged_results = reciprocal_rank_fusion(vector_results, keyword_results, limit=top_k)
    return merged_results

def reciprocal_rank_fusion(vector_results, keyword_results, limit=5, k=60):
    rrf_scores = {}
    doc_map = {}
    
    for rank, doc in enumerate(vector_results, 1):
        doc_id = str(doc["_id"])
        doc_map[doc_id] = doc
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank))
        
    for rank, doc in enumerate(keyword_results, 1):
        doc_id = str(doc["_id"])
        doc_map[doc_id] = doc
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank))
        
    sorted_docs = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_map[doc_id] for doc_id, _ in sorted_docs[:limit]]


if __name__ == "__main__":
    while True:
        query = input("\nEnter query: ")

        if query.lower() == "exit":
            break

        results = retrieve(query)

        print("\nRetrieved Chunks:\n")

        for i, chunk in enumerate(results, 1):
            print(f"{i}. {chunk['title']}")
            print(f"   Source: {chunk['source_type']}")
            print(f"   Chunk: {chunk['chunk_text'][:300]}")
            print()
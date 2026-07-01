import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

sys.path.append(r"c:\Users\Lenovo\OneDrive\Desktop\code by me\vaahan-international\backend-ai")
load_dotenv()

# Source DB (Old cluster with 46 articles)
source_uri = "mongodb+srv://pachkawadeshravani_db_user:8GFUazTAYbH9GkK1@vaahan-cluster.vnmnkao.mongodb.net/?appName=Vaahan-cluster"
source_db_name = "test"

# Target DB (Production cluster)
target_uri = os.getenv("MONGODB_URI")
target_db_name = os.getenv("MONGODB_DB_NAME", "test")

def clean_keyword(w):
    return w.strip(":,.-?()\"'“”’").lower()

def generate_keywords(article):
    keywords = [article.get("category")]
    
    # Add tags
    if article.get("tags"):
        keywords.extend(article.get("tags"))
        
    # Split title words
    title_words = [clean_keyword(w) for w in article.get("title", "").split()]
    stop_words = {"vs", "the", "and", "for", "with", "from", "why", "it", "how", "what", "is", "a", "an", "on", "in", "of", "to", "are"}
    filtered_title = [w for w in title_words if len(w) > 2 and w not in stop_words]
    keywords.extend(filtered_title)
    
    # Return unique, clean keywords
    clean_unique = list(set([k for k in keywords if k]))
    return [k.title() if len(k) > 3 else k.upper() for k in clean_unique]

def main():
    print("Connecting to Source DB...")
    src_client = MongoClient(source_uri)
    src_db = src_client[source_db_name]
    
    print("Connecting to Target DB...")
    tgt_client = MongoClient(target_uri)
    tgt_db = tgt_client[target_db_name]
    
    # 1. Fetch articles from Source
    articles = list(src_db.articles.find({}))
    print(f"Found {len(articles)} articles in Source DB.")
    
    if not articles:
        print("[ERROR] No articles found to migrate.")
        return
        
    # 2. Generate seoKeywords and prepare documents
    prepared_articles = []
    for art in articles:
        # Generate keywords
        seo_keywords = generate_keywords(art)
        art["seoKeywords"] = seo_keywords
        
        # Ensure seoTitle and seoDescription exist
        if not art.get("seoTitle"):
            art["seoTitle"] = art.get("title")
        if not art.get("seoDescription"):
            art["seoDescription"] = art.get("excerpt", "")
            
        # Remove old embedding timestamp to trigger re-index
        if "last_embedded_at" in art:
            del art["last_embedded_at"]
            
        prepared_articles.append(art)
        
    # 3. Clear and overwrite target articles collection
    print("Clearing production 'articles' collection...")
    tgt_db.articles.delete_many({})
    
    print(f"Copying {len(prepared_articles)} articles with SEO keywords to Production...")
    tgt_db.articles.insert_many(prepared_articles)
    print("[SUCCESS] Production articles collection restored.")
    
    # 4. Clear old AI chunks
    print("Clearing old AI chunks from production DB...")
    tgt_db.ai_chunks.delete_many({})
    
    # 5. Trigger RAG re-indexing
    print("\nTriggering RAG Ingestion for all 46 articles...")
    from app.scripts.ingest_articles import ingest
    try:
        ingest()
        print("\n✅ Migration and RAG indexing complete! The production database has 46 articles with SEO keywords.")
    except Exception as e:
        print(f"[ERROR] Ingestion failed: {e}")
        
    src_client.close()
    tgt_client.close()

if __name__ == "__main__":
    main()

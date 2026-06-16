// src/components/CategoriesDropdown.jsx
/*
================================================================================
File Name : CategoriesDropdown.jsx
Author : Tahseen Raza
Created Date : 2025-01-15
Description : Professional categories dropdown with proper hover handling
Company : Vaahan International
Copyright : (c) 2025 Vaahan International. All rights reserved.
================================================================================
*/

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovering(true)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false)
      setIsOpen(false)
      setActiveCategory(null)
    }, 200)
  }

  const handleCategoryMouseEnter = (categoryName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(categoryName)
  }

  const handleCategoryMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 200)
  }

  const handleSubmenuMouseEnter = (categoryName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(categoryName)
  }

  const categories = [
    {
      name: "Feature Reviews",
      articles: [
        { title: "AWD vs FWD: The ₹2 Lakh Question", slug: "awd-vs-fwd" },
        { title: "ADAS Lane Keep Assist Review", slug: "adas-lane-keep-assist" },
        { title: "FWD Car in Spiti Winter", slug: "fwd-car-spiti-winter" },
        { title: "Best Tyres for Highway Drives", slug: "best-highway-tyres" }
      ]
    },
    {
      name: "New Launches",
      articles: [
        { title: "2026 Hyundai Creta Launch", slug: "hyundai-creta-2026-launch" },
        { title: "New Kia Seltos 2026", slug: "kia-seltos-2026" }
      ]
    },
    {
      name: "Tech Insights",
      articles: [
        { title: "What is ADAS? Complete Guide", slug: "what-is-adas" },
        { title: "What is ABS? How It Works", slug: "what-is-abs" },
        { title: "What is EBD? Explained", slug: "what-is-ebd" },
        { title: "What is ESC? Stability Control", slug: "what-is-esc" }
      ]
    }
  ]

  return (
    <div 
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <button className="flex items-center gap-1 font-semibold text-[16px] tracking-wide text-gray-900 hover:text-black transition-colors">
        Categories
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Compare Cars - Direct Link */}
          <Link
            to="/compare-cars"
            className="flex items-center justify-between px-4 py-3 hover:bg-yellow-50 transition-colors border-b border-gray-100"
          >
            <div>
              <div className="font-bold text-gray-800">Compare Cars</div>
              <div className="text-xs text-gray-400">Side by side car comparison</div>
            </div>
            <span className="text-yellow-500 text-sm">→</span>
          </Link>

          {/* Categories */}
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="relative border-b border-gray-100 last:border-0"
              onMouseEnter={() => handleCategoryMouseEnter(category.name)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-gray-800">{category.name}</div>
                  <div className="text-xs text-gray-400">{category.articles.length} articles</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Submenu */}
              {activeCategory === category.name && (
                <div 
                  className="absolute left-full top-0 ml-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
                  onMouseEnter={() => handleSubmenuMouseEnter(category.name)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <span className="font-semibold text-gray-800">{category.name}</span>
                      <span className="text-xs text-gray-400 ml-2">({category.articles.length})</span>
                    </div>
                    {category.articles.map((article, articleIdx) => (
                      <Link
                        key={articleIdx}
                        to={`/article/${article.slug}`}
                        className="block px-4 py-2 hover:bg-yellow-50 transition-colors"
                      >
                        <span className="text-sm text-gray-700 hover:text-yellow-600">
                          {article.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesDropdown
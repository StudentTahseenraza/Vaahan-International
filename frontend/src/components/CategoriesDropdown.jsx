// src/components/CategoriesDropdown.jsx
/*
================================================================================
File Name : CategoriesDropdown.jsx
Author : Tahseen Raza
Created Date : 2025-01-15
Description : Professional categories dropdown with left-side nested dropdown
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const CategoriesDropdown = () => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const timeoutRef = useRef(null)
  const dropdownRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Theme-aware text colors
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const subTextColor = isDark ? 'text-gray-400' : 'text-gray-500'
  const hoverBg = isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-50'
  const subHoverBg = isDark ? 'hover:bg-dark-700' : 'hover:bg-yellow-50'
  const borderColor = isDark ? 'border-dark-700' : 'border-gray-100'
  const bgColor = isDark ? 'bg-dark-800' : 'bg-white'
  const subBgColor = isDark ? 'bg-dark-800' : 'bg-white'
  const headerBg = isDark ? 'bg-dark-700' : 'bg-gray-50'

  return (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger - Theme-aware */}
      <button className={`flex items-center gap-1 font-semibold text-[16px] tracking-wide ${textColor} hover:text-yellow-500 transition-colors`}>
        Categories
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-72 rounded-lg shadow-xl border ${borderColor} z-50 ${bgColor}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Compare Cars - Direct Link */}
          <Link
            to="/compare-cars"
            className={`flex items-center justify-between px-4 py-3 ${hoverBg} transition-colors border-b ${borderColor}`}
          >
            <div>
              <div className={`font-bold ${textColor}`}>Compare Cars</div>
              <div className={`text-xs ${subTextColor}`}>Side by side car comparison</div>
            </div>
            <span className="text-yellow-500 text-sm">→</span>
          </Link>

          {/* Categories */}
          {categories.map((category, idx) => (
            <div
              key={idx}
              className={`relative border-b ${borderColor} last:border-0`}
              onMouseEnter={() => handleCategoryMouseEnter(category.name)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className={`flex items-center justify-between px-4 py-3 ${hoverBg} cursor-pointer transition-colors`}>
                <div>
                  <div className={`font-semibold ${textColor}`}>{category.name}</div>
                  <div className={`text-xs ${subTextColor}`}>{category.articles.length} articles</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Submenu - Now opens on the LEFT side */}
              {activeCategory === category.name && (
                <div
                  className={`absolute top-0 right-full mr-0 w-80 rounded-lg shadow-xl border ${borderColor} z-50 ${subBgColor}`}
                  style={{ left: 'auto', right: '100%' }}
                  onMouseEnter={() => handleSubmenuMouseEnter(category.name)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <div className="py-2">
                    <div className={`px-4 py-2 ${headerBg} border-b ${borderColor}`}>
                      <span className={`font-semibold ${textColor}`}>{category.name}</span>
                      <span className={`text-xs ${subTextColor} ml-2`}>({category.articles.length})</span>
                    </div>
                    {category.articles.map((article, articleIdx) => (
                      <Link
                        key={articleIdx}
                        to={`/article/${article.slug}`}
                        className={`block px-4 py-2 ${subHoverBg} transition-colors`}
                      >
                        <span className={`text-sm ${textColor} hover:text-yellow-500`}>
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
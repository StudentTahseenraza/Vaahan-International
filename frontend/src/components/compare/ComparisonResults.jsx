// src/components/compare/ComparisonResults.jsx

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const ComparisonResults = ({ comparisonData, onClear }) => {
  const [expandedRow, setExpandedRow] = useState(null)
  
  const { car1, car2, summary } = comparisonData

  const categoryOrder = [
    { key: 'torque', label: 'MAX TORQUE', icon: '⚡' },
    { key: 'power', label: 'MAX POWER', icon: '🏎️' },
    { key: 'mileage', label: 'FUEL EFFICIENCY', icon: '⛽' },
    { key: 'bootSpace', label: 'BOOT SPACE', icon: '🧳' },
    { key: 'groundClearance', label: 'GROUND CLEARANCE', icon: '🛤️' },
    { key: 'turningRadius', label: 'TURNING RADIUS', icon: '🔄' },
    { key: 'price', label: 'EX-SHOWROOM PRICE', icon: '💰' },
  ]

  const getColorClasses = (rating) => {
    if (rating === null || rating === undefined) {
      return {
        bg: 'bg-gray-300 dark:bg-gray-600',
        text: 'text-gray-400 dark:text-gray-500',
        bar: 'bg-gray-300 dark:bg-gray-600',
      }
    }
    if (rating >= 8) {
      return {
        bg: 'bg-green-500',
        text: 'text-green-600 dark:text-green-400',
        bar: 'bg-green-500',
      }
    } else if (rating >= 5) {
      return {
        bg: 'bg-yellow-500',
        text: 'text-yellow-600 dark:text-yellow-400',
        bar: 'bg-yellow-500',
      }
    } else {
      return {
        bg: 'bg-red-500',
        text: 'text-red-600 dark:text-red-400',
        bar: 'bg-red-500',
      }
    }
  }

  const getRatingData = (key) => {
    const r1 = car1.ratings?.[key] || null
    const r2 = car2.ratings?.[key] || null

    return {
      label: r1?.label || categoryOrder.find(c => c.key === key)?.label || key,
      icon: r1?.icon || categoryOrder.find(c => c.key === key)?.icon || '📊',
      car1: {
        value: r1?.displayValue || 'N/A',
        rating: r1?.rating || null,
        explanation: r1?.explanation || null,
        color: r1?.color || null,
      },
      car2: {
        value: r2?.displayValue || 'N/A',
        rating: r2?.rating || null,
        explanation: r2?.explanation || null,
        color: r2?.color || null,
      },
    }
  }

  const toggleExpand = (key) => {
    setExpandedRow(expandedRow === key ? null : key)
  }

  // 🔧 FIX: Longer progress bar (w-40 instead of w-28)
  const renderRatingBar = (rating) => {
    const colors = getColorClasses(rating)
    const percentage = rating !== null ? (rating / 10) * 100 : 0

    return (
      <div className="flex items-center gap-3">
        <div className="w-40 h-2.5 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full ${colors.bar} rounded-full`}
          />
        </div>
        <span className={`text-sm font-bold ${colors.text} min-w-[50px] text-right`}>
          {rating !== null ? `${rating.toFixed(1)} / 10` : 'N/A'}
        </span>
      </div>
    )
  }

  const getVisibleCategories = () => {
    const visible = []
    for (const cat of categoryOrder) {
      const data = getRatingData(cat.key)
      const hasData = data.car1.rating !== null || data.car2.rating !== null
      if (hasData) {
        visible.push({ ...cat, data })
      }
    }
    return visible
  }

  const visibleCategories = getVisibleCategories()
  const car1Name = `${car1.brand} ${car1.model}`
  const car2Name = `${car2.brand} ${car2.model}`

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClear}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              New Comparison
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
              {car1Name} vs {car2Name}
            </h2>
          </div>
          <button onClick={onClear} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            ✕
          </button>
        </div>
      </div>

      {/* 🔧 FIX: Car Headers - Car names at top, NO trophy badges */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700/50 dark:to-dark-700/30 border-b border-gray-200 dark:border-dark-700">
        {/* Car 1 */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <img 
              src={car1.image} 
              alt={car1.model} 
              className="w-48 h-36 md:w-56 md:h-44 lg:w-64 lg:h-48 object-contain rounded-xl bg-white dark:bg-dark-800 shadow-md p-3 border border-gray-200 dark:border-dark-600" 
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs font-medium px-2.5 py-0.5 bg-yellow-500 text-gray-900 rounded-full">
              {car1.brand}
            </span>
          </div>
          <div className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{car1.model}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{car1.name}</div>
          <div className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mt-1">{car1.price}</div>
          {car1.overallScore && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full">
              <span className="text-xs text-gray-600 dark:text-gray-400">★</span>
              <span className="text-sm font-bold text-yellow-500">{car1.overallScore.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Car 2 */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <img 
              src={car2.image} 
              alt={car2.model} 
              className="w-48 h-36 md:w-56 md:h-44 lg:w-64 lg:h-48 object-contain rounded-xl bg-white dark:bg-dark-800 shadow-md p-3 border border-gray-200 dark:border-dark-600" 
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs font-medium px-2.5 py-0.5 bg-yellow-500 text-gray-900 rounded-full">
              {car2.brand}
            </span>
          </div>
          <div className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{car2.model}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{car2.name}</div>
          <div className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mt-1">{car2.price}</div>
          {car2.overallScore && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full">
              <span className="text-xs text-gray-600 dark:text-gray-400">★</span>
              <span className="text-sm font-bold text-yellow-500">{car2.overallScore.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 md:px-6 py-3 bg-gray-50 dark:bg-dark-700/30 border-b border-gray-200 dark:border-dark-700">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">🏆</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{car1Name}</span>
            <span className="font-bold text-green-600 dark:text-green-400">{summary.car1Wins}</span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">🏆</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{car2Name}</span>
            <span className="font-bold text-green-600 dark:text-green-400">{summary.car2Wins}</span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">⚖️</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Ties</span>
            <span className="font-bold text-gray-600 dark:text-gray-300">{summary.ties}</span>
          </div>
        </div>
      </div>

      {/* 🔧 FIX: Comparison Rows - NO trophy badges, bolder parameter names, longer bars */}
      <div className="p-4 md:p-6">
        <div className="space-y-2">
          {visibleCategories.map((category, index) => {
            const { key, label, icon, data } = category
            const isExpanded = expandedRow === key
            const hasExplanation = data.car1.explanation || data.car2.explanation

            return (
              <div 
                key={key} 
                className={`border border-gray-200 dark:border-dark-700 rounded-xl overflow-hidden transition-shadow hover:shadow-md ${
                  isExpanded ? 'shadow-md' : ''
                }`}
              >
                {/* 🔧 FIX: Bold parameter names */}
                <div 
                  className={`grid grid-cols-1 md:grid-cols-3 gap-3 p-4 ${
                    index % 2 === 0 ? 'bg-white dark:bg-dark-800' : 'bg-gray-50/50 dark:bg-dark-700/30'
                  }`}
                >
                  {/* 🔧 FIX: Uppercase, bolder parameter name */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>

                  {/* Car 1 */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.car1.value}
                    </span>
                    {renderRatingBar(data.car1.rating)}
                  </div>

                  {/* Car 2 */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {data.car2.value}
                    </span>
                    {renderRatingBar(data.car2.rating)}
                  </div>
                </div>

                {/* 🔧 FIX: Clean expand/collapse - only "▶" */}
                {hasExplanation && (
                  <button
                    className={`w-full px-4 py-2 border-t border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/30 transition-colors flex items-center gap-2 ${
                      index % 2 === 0 ? 'bg-white dark:bg-dark-800' : 'bg-gray-50/50 dark:bg-dark-700/30'
                    }`}
                    onClick={() => toggleExpand(key)}
                  >
                    <span className={`text-sm text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}>
                      ▶
                    </span>
                  </button>
                )}

                {/* Explanation Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-3 bg-gray-50/80 dark:bg-dark-700/30 border-t border-gray-200 dark:border-dark-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Car 1 Explanation */}
                          {data.car1.explanation && (
                            <div className="p-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {car1Name}
                                </span>
                                {data.car1.rating !== null && data.car1.rating >= 7 && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                    ★ Good
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {data.car1.explanation.summary}
                              </p>
                              <ul className="mt-1.5 space-y-0.5">
                                {data.car1.explanation.details?.map((detail, idx) => (
                                  <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                                    <span className="text-green-500">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Car 2 Explanation */}
                          {data.car2.explanation && (
                            <div className="p-3 rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {car2Name}
                                </span>
                                {data.car2.rating !== null && data.car2.rating >= 7 && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                    ★ Good
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {data.car2.explanation.summary}
                              </p>
                              <ul className="mt-1.5 space-y-0.5">
                                {data.car2.explanation.details?.map((detail, idx) => (
                                  <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                                    <span className="text-green-500">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rating Guide */}
      <div className="px-4 md:px-6 pb-4">
        <div className="p-3 bg-gray-50 dark:bg-dark-700/50 rounded-lg border border-gray-200 dark:border-dark-700">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-semibold text-gray-600 dark:text-gray-400">Rating Guide:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">8-10: Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">5-7.9: Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Below 5: Needs Improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 md:px-6 pb-4 flex flex-wrap gap-3 justify-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="px-6 py-2.5 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          🔄 Refresh
        </button>
        <button 
          onClick={onClear} 
          className="px-6 py-2.5 border border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-400 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-all duration-300"
        >
          New Comparison
        </button>
      </div>
    </div>
  )
}

export default ComparisonResults
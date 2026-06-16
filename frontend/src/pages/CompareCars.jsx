// src/pages/CompareCars.jsx
/*
================================================================================
File Name : CompareCars.jsx
Author : Tahseen Raza
Created Date : 2025-01-16
Description : Professional car comparison with three-layer selection and scores
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getAllBrands,
  getAllCars,
  getModelsByBrand,
  getVariantsByBrandAndModel,
  getCarByBrandModelVariant,
  popularComparisons
} from '../data/cars/index'
import ScoreDisplay from '../components/ScoreDisplay'

const CompareCars = () => {
  // Car selection state - Three layer
  const [brand1, setBrand1] = useState('')
  const [model1, setModel1] = useState('')
  const [variant1, setVariant1] = useState('')
  const [brand2, setBrand2] = useState('')
  const [model2, setModel2] = useState('')
  const [variant2, setVariant2] = useState('')

  const [car1Id, setCar1Id] = useState(null)
  const [car2Id, setCar2Id] = useState(null)
  const [showComparison, setShowComparison] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightDifferences, setHighlightDifferences] = useState(true)
  const [activeSection, setActiveSection] = useState('basic')
  const [isComparing, setIsComparing] = useState(false)

  const brands = getAllBrands()

  const car1 = car1Id ? getCarByBrandModelVariant(brand1, model1, variant1) : null
  const car2 = car2Id ? getCarByBrandModelVariant(brand2, model2, variant2) : null

  // Get models for selected brand
  const getModels = (brand) => {
    return brand ? getModelsByBrand(brand) : []
  }

  // Get variants for selected brand and model
  const getVariants = (brand, model) => {
    if (!brand || !model) return []
    const variants = getVariantsByBrandAndModel(brand, model)
    return variants.map(v => v.name)
  }

  // Handle brand selection
  const handleBrandSelect = (position, brand) => {
    if (position === 1) {
      setBrand1(brand)
      setModel1('')
      setVariant1('')
      setCar1Id(null)
      setShowComparison(false)
      setIsComparing(false)
    } else {
      setBrand2(brand)
      setModel2('')
      setVariant2('')
      setCar2Id(null)
      setShowComparison(false)
      setIsComparing(false)
    }
  }

  // Handle model selection
  const handleModelSelect = (position, model) => {
    if (position === 1) {
      setModel1(model)
      setVariant1('')
      setCar1Id(null)
      setShowComparison(false)
      setIsComparing(false)
    } else {
      setModel2(model)
      setVariant2('')
      setCar2Id(null)
      setShowComparison(false)
      setIsComparing(false)
    }
  }

  // Handle variant selection
  const handleVariantSelect = (position, variant) => {
    if (position === 1) {
      setVariant1(variant)
      const car = getCarByBrandModelVariant(brand1, model1, variant)
      if (car) {
        setCar1Id(car.id)
        setShowComparison(false)
        setIsComparing(false)
      }
    } else {
      setVariant2(variant)
      const car = getCarByBrandModelVariant(brand2, model2, variant)
      if (car) {
        setCar2Id(car.id)
        setShowComparison(false)
        setIsComparing(false)
      }
    }
  }

  // Handle compare
  const handleCompare = () => {
    if (car1Id && car2Id) {
      setIsComparing(true)
      setShowLoadingModal(true)
      setIsLoading(true)

      setTimeout(() => {
        setShowComparison(true)
        setIsLoading(false)
        setShowLoadingModal(false)
        setTimeout(() => {
          const element = document.getElementById('comparison-results')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }, 1500)
    }
  }

  // Handle popular comparison click
  const handlePopularCompare = (id1, id2) => {
    // Find cars by ID
    const allCars = getAllCars()
    const car1Data = allCars.find(c => c.id === id1)
    const car2Data = allCars.find(c => c.id === id2)

    if (car1Data && car2Data) {
      setBrand1(car1Data.brand)
      setModel1(car1Data.model)
      setVariant1(car1Data.variant)
      setBrand2(car2Data.brand)
      setModel2(car2Data.model)
      setVariant2(car2Data.variant)
      setCar1Id(id1)
      setCar2Id(id2)
      setIsComparing(true)
      setShowLoadingModal(true)
      setIsLoading(true)

      setTimeout(() => {
        setShowComparison(true)
        setIsLoading(false)
        setShowLoadingModal(false)
        setTimeout(() => {
          const element = document.getElementById('comparison-results')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }, 1500)
    }
  }

  // Clear all
  const clearAll = () => {
    setBrand1('')
    setModel1('')
    setVariant1('')
    setBrand2('')
    setModel2('')
    setVariant2('')
    setCar1Id(null)
    setCar2Id(null)
    setShowComparison(false)
    setIsComparing(false)
    setShowLoadingModal(false)
    setIsLoading(false)
    setActiveSection('basic')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Section tabs configuration
  const sections = [
    { id: 'basic', label: 'Basic Information', icon: '📋' },
    { id: 'engine', label: 'Engine & Performance', icon: '⚡' },
    { id: 'safety', label: 'Safety Features', icon: '🛡️' },
    { id: 'features', label: 'Comfort & Features', icon: '🎯' },
    { id: 'scores', label: 'Scores', icon: '⭐' },
    { id: 'warranty', label: 'Warranty & Service', icon: '🔧' }
  ]

  // Get section data
  const getSectionData = (sectionId) => {
    if (!car1 || !car2) return []

    const sectionMap = {
      basic: ['engine', 'transmission', 'power', 'torque', 'mileage', 'seating', 'bootSpace', 'fuelType', 'displacement'],
      engine: ['engine', 'transmission', 'power', 'torque', 'mileage', 'topSpeed', 'acceleration', 'braking', 'turningRadius', 'groundClearance'],
      safety: ['safety', 'abs', 'esc', 'tractionControl', 'hillAssist', 'rearCamera', 'parkingSensors', 'tyrePressureMonitor', 'isofix', 'adas'],
      features: ['sunroof', 'infotainment', 'display', 'speakers', 'ac', 'ventilatedSeats', 'poweredSeats', 'cruiseControl', 'pushStart', 'ambientLighting'],
      scores: ['scores'],
      warranty: ['warranty', 'extendedWarranty', 'roadsideAssistance']
    }

    const keys = sectionMap[sectionId] || []
    if (sectionId === 'scores') {
      return [
        {
          key: 'scores',
          label: 'Real-World Scores',
          value1: car1.scores || null,
          value2: car2.scores || null,
          isScores: true
        }
      ]
    }
    return keys
      .filter(key => car1.comparisonData[key] || car2.comparisonData[key])
      .map(key => ({
        key,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value1: car1.comparisonData[key] || 'N/A',
        value2: car2.comparisonData[key] || 'N/A',
        isScores: false
      }))
  }

  // Loading Modal
  if (showLoadingModal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🚗</div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Comparing Cars</h3>
          <p className="text-gray-500 mb-4">Analyzing features, specifications, and scores...</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="animate-pulse">●</span>
            <span className="animate-pulse delay-150">●</span>
            <span className="animate-pulse delay-300">●</span>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Compare Cars Side by Side
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Select Brand → Model → Variant to compare real-world scores and specifications
          </motion.p>
        </div>
      </section>

      {/* Three-Layer Selection */}
      {!isComparing && (
        <section className="py-12 bg-gray-50 border-b border-gray-200 relative -mt-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Select Cars to Compare</h2>
                <p className="text-gray-500 text-sm mt-1">Choose Brand → Model → Variant for each car</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Car 1 Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Add Car 1</label>

                  {/* Brand Select */}
                  <select
                    value={brand1}
                    onChange={(e) => handleBrandSelect(1, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white mb-2"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>

                  {/* Model Select */}
                  <select
                    value={model1}
                    onChange={(e) => handleModelSelect(1, e.target.value)}
                    disabled={!brand1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white mb-2"
                  >
                    <option value="">Select Model</option>
                    {getModels(brand1).map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>

                  {/* Variant Select */}
                  <select
                    value={variant1}
                    onChange={(e) => handleVariantSelect(1, e.target.value)}
                    disabled={!model1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  >
                    <option value="">Select Variant</option>
                    {getVariants(brand1, model1).map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>

                  {/* Selected Car Display */}
                  {car1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center gap-3"
                    >
                      <img src={car1.image} alt={car1.model} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <div className="font-semibold text-gray-800">{car1.brand} {car1.model}</div>
                        <div className="text-sm text-gray-500">{car1.variant}</div>
                        <div className="text-sm text-gray-500">{car1.price}</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* VS Divider */}
                <div className="text-center pt-6 md:pt-0">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    VS
                  </div>
                </div>

                {/* Car 2 Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Add Car 2</label>

                  {/* Brand Select */}
                  <select
                    value={brand2}
                    onChange={(e) => handleBrandSelect(2, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white mb-2"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>

                  {/* Model Select */}
                  <select
                    value={model2}
                    onChange={(e) => handleModelSelect(2, e.target.value)}
                    disabled={!brand2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white mb-2"
                  >
                    <option value="">Select Model</option>
                    {getModels(brand2).map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>

                  {/* Variant Select */}
                  <select
                    value={variant2}
                    onChange={(e) => handleVariantSelect(2, e.target.value)}
                    disabled={!model2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                  >
                    <option value="">Select Variant</option>
                    {getVariants(brand2, model2).map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>

                  {/* Selected Car Display */}
                  {car2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center gap-3"
                    >
                      <img src={car2.image} alt={car2.model} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <div className="font-semibold text-gray-800">{car2.brand} {car2.model}</div>
                        <div className="text-sm text-gray-500">{car2.variant}</div>
                        <div className="text-sm text-gray-500">{car2.price}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Compare Button */}
              <div className="text-center mt-8">
                <button
                  onClick={handleCompare}
                  disabled={!car1Id || !car2Id}
                  className={`px-12 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 ${car1Id && car2Id
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg hover:scale-105 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {car1Id && car2Id ? 'Compare Now' : 'Select both cars to compare'}
                </button>
                {(car1Id || car2Id) && (
                  <button
                    onClick={clearAll}
                    className="ml-4 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Compare real-world scores, features, specifications, and more
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Results */}
      {isComparing && showComparison && car1 && car2 && (
        <section id="comparison-results" className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={clearAll}
                    className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    New Comparison
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {car1.brand} {car1.model} vs {car2.brand} {car2.model}
                  </h2>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={highlightDifferences}
                      onChange={() => setHighlightDifferences(!highlightDifferences)}
                      className="w-4 h-4 text-yellow-500 rounded"
                    />
                    Highlight Differences
                  </label>
                  <button
                    onClick={clearAll}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Car Headers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 mb-8">
                {/* <div className="text-center flex items-center justify-center">
                  <h3 className="font-semibold text-gray-500 text-sm">Comparison</h3>
                </div> */}
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <img src={car1.image} alt={car1.model} className="w-80 h-80 object-cover rounded-lg mx-auto mb-4 shadow-md" />
                    <h3 className="font-bold text-gray-800 text-xl">{car1.brand}</h3>
                    <p className="text-2xl font-bold text-gray-900">{car1.model}</p>
                    <p className="text-sm text-gray-500 mt-1">{car1.variant}</p>
                    <p className="text-sm text-gray-500">{car1.price}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <img src={car2.image} alt={car2.model} className="w-80 h-80 object-cover rounded-lg mx-auto mb-4 shadow-md" />
                    <h3 className="font-bold text-gray-800 text-xl">{car2.brand}</h3>
                    <p className="text-2xl font-bold text-gray-900">{car2.model}</p>
                    <p className="text-sm text-gray-500 mt-1">{car2.variant}</p>
                    <p className="text-sm text-gray-500">{car2.price}</p>
                  </div>
                </div>
              </div>

              {/* Section Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-0">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeSection === section.id
                      ? 'bg-yellow-500 text-gray-900 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    <span>{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Section Content */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <AnimatePresence mode="wait">
                  {sections.map((section) => {
                    if (activeSection !== section.id) return null
                    const sectionData = getSectionData(section.id)

                    if (section.id === 'scores') {
                      // Get scores safely - ensure they are passed as objects
                      const scores1 = car1?.scores && typeof car1.scores === 'object' ? car1.scores : null
                      const scores2 = car2?.scores && typeof car2.scores === 'object' ? car2.scores : null

                      console.log('Scores data:', {
                        car1Scores: scores1,
                        car2Scores: scores2,
                        car1Name: `${car1.brand} ${car1.model}`,
                        car2Name: `${car2.brand} ${car2.model}`
                      })

                      return (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="p-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ScoreDisplay
                              scores={scores1}
                              carName={`${car1.brand} ${car1.model} - ${car1.variant}`}
                            />
                            <ScoreDisplay
                              scores={scores2}
                              carName={`${car2.brand} ${car2.model} - ${car2.variant}`}
                            />
                          </div>
                        </motion.div>
                      )
                    }

                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            <span>{section.icon}</span>
                            {section.label}
                          </h3>
                        </div>

                        <table className="w-full">
                          <tbody>
                            {sectionData.map((param, index) => {
                              if (param.isScores) return null
                              const isDifferent = highlightDifferences && param.value1 !== param.value2
                              return (
                                <tr key={param.key} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-50 transition-colors`}>
                                  <td className="px-6 py-4 font-semibold text-gray-700 capitalize border-b border-gray-100 w-1/3">
                                    {param.label}
                                  </td>
                                  <td className={`px-6 py-4 border-b border-gray-100 w-1/3 ${isDifferent ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
                                    {param.value1}
                                    {isDifferent && <span className="ml-2 text-xs text-green-500">✓</span>}
                                  </td>
                                  <td className={`px-6 py-4 border-b border-gray-100 w-1/3 ${isDifferent ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
                                    {param.value2}
                                    {isDifferent && <span className="ml-2 text-xs text-green-500">✓</span>}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Quick Summary Cards */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-bold text-gray-800 mb-2">🏆 Price Winner</h4>
                  <p className="text-sm text-gray-600">
                    {parseInt(car1.price.replace(/[^0-9]/g, '')) < parseInt(car2.price.replace(/[^0-9]/g, ''))
                      ? `${car1.brand} ${car1.model}`
                      : `${car2.brand} ${car2.model}`}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2">⭐ Overall Score Winner</h4>
                  <p className="text-sm text-gray-600">
                    {car1.scores && car2.scores &&
                      (Object.values(car1.scores).reduce((a, b) => a + b, 0) > Object.values(car2.scores).reduce((a, b) => a + b, 0)
                        ? `${car1.brand} ${car1.model}`
                        : `${car2.brand} ${car2.model}`)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-gray-800 mb-2">🛡️ Safety Winner</h4>
                  <p className="text-sm text-gray-600">
                    {car1.scores && car2.scores &&
                      (car1.scores.safety > car2.scores.safety
                        ? `${car1.brand} ${car1.model}`
                        : car2.scores.safety > car1.scores.safety
                          ? `${car2.brand} ${car2.model}`
                          : 'Both have similar safety scores')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    // Refresh comparison
                    setShowComparison(false)
                    setShowLoadingModal(true)
                    setTimeout(() => {
                      setShowComparison(true)
                      setShowLoadingModal(false)
                    }, 1500)
                  }}
                  className="px-6 py-2.5 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  🔄 Refresh Comparison
                </button>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  New Comparison
                </button>
                <Link
                  to="/articles"
                  className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Read Reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Comparisons */}
      <section className={`py-16 ${isComparing && showComparison ? 'bg-white border-t border-gray-200' : 'bg-gray-50'}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">Popular Comparisons</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Most Compared Cars</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularComparisons.map((comparison) => {
              const allCars = getAllCars()
              const car1Data = allCars.find(c => c.id === comparison.car1Id)
              const car2Data = allCars.find(c => c.id === comparison.car2Id)
              if (!car1Data || !car2Data) return null
              return (
                <motion.button
                  key={comparison.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  onClick={() => handlePopularCompare(car1Data.id, car2Data.id)}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-left border border-gray-100 hover:border-yellow-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <img src={car1Data.image} alt={car1Data.model} className="w-12 h-12 object-cover rounded" />
                        <span className="font-semibold text-gray-800">{car1Data.model}</span>
                      </div>
                    </div>
                    <div className="text-yellow-500 font-bold mx-2 text-sm">VS</div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="font-semibold text-gray-800">{car2Data.model}</span>
                        <img src={car2Data.image} alt={car2Data.model} className="w-12 h-12 object-cover rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-xs text-gray-400">
                    {car1Data.brand} vs {car2Data.brand}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default CompareCars
// src/components/ThemeToggle.jsx
/*
================================================================================
File Name : ThemeToggle.jsx
Author : Tahseen Raza
Created Date : 2025-06-17
Description : Simple theme toggle button - click to switch between light and dark
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
      style={{
        backgroundColor: isDark ? '#1e293b' : '#e2e8f0'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun/Moon Icons */}
      <div className="flex justify-between items-center w-full px-1">
        <span className="text-xs">☀️</span>
        <span className="text-xs">🌙</span>
      </div>
      
      {/* Toggle Circle */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
        animate={{
          x: isDark ? 28 : 4
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      />
    </button>
  )
}

export default ThemeToggle
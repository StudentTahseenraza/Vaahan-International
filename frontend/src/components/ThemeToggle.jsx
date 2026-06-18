// src/components/ThemeToggle.jsx - Ultra fast version
/*
================================================================================
File Name : ThemeToggle.jsx
Author : Tahseen Raza
Created Date : 2025-06-17
Description : Ultra fast theme toggle - no animation delay
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="
        relative
        flex
        items-center
        justify-center
        w-10
        h-10
        md:w-11
        md:h-11
        rounded-full
        border
        transition-none
        hover:scale-110
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-yellow-500
        backdrop-blur-md
      "
      style={{
        background: isDark
          ? "rgba(15,23,42,0.75)"
          : "rgb(7, 14, 41)",
        borderColor: isDark
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.08)",
        boxShadow: isDark
          ? "0 8px 30px rgba(0,0,0,.35)"
          : "0 8px 25px rgba(0,0,0,.08)"
      }}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
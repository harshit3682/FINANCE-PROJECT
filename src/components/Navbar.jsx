import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import RoleSwitcher from './RoleSwitcher'

export default function Navbar() {
  const darkMode = useStore(s => s.darkMode)
  const toggleDarkMode = useStore(s => s.toggleDarkMode)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <nav className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Finance Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1.5 rounded-md text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <RoleSwitcher />
        </div>
      </div>
    </nav>
  )
}


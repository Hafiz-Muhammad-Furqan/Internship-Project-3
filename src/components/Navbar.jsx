import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { setFilters } from '../store/slices/newsSlice'
import { 
  MagnifyingGlassIcon,
  UserCircleIcon,
  NewspaperIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

function Navbar() {
  const { isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = ['general', 'technology', 'politics', 'sports']

  const handleSearch = (e) => {
    e.preventDefault()
    const searchQuery = e.target.search.value
    dispatch(setFilters({ searchQuery }))
  }

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <NewspaperIcon className="h-8 w-8" />
            <span>NewsHub</span>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="capitalize hover:text-primary transition-colors flex items-center space-x-1"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="search"
                name="search"
                placeholder="Search news..."
                className="input pr-10"
              />
              <button type="submit" className="absolute right-2 p-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </button>
            </form>

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-primary flex items-center space-x-2"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-primary flex items-center space-x-2">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    handleCategoryChange(category)
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {category}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="mt-4 px-4">
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  placeholder="Search news..."
                  className="input w-full pr-10"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
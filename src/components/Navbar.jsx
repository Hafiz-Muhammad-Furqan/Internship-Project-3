import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  NewspaperIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { setArticles, setLoading, setError } from "../store/slices/newsSlice";
import axios from "axios";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const categories = ["General", "Technology", "Business", "Sports"];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          search
        )}&apiKey=e922eea40c5e49d3b8f5dbfed998a3e3`
      );
      dispatch(setArticles(response.data.articles));
      setSearch(() => "");
    } catch (error) {
      dispatch(setError(error.message));
      setSearch(() => "");
    }
  };

  const fetchNewsWithCategory = async (category) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(
          category.toLowerCase()
        )}&apiKey=e922eea40c5e49d3b8f5dbfed998a3e3`
      );
      dispatch(setArticles(response.data.articles));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary"
          >
            <NewspaperIcon className="h-8 w-8" />
            <span>NewsHub</span>
          </Link>

          <div className="hidden lg:flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => fetchNewsWithCategory(category)}
                className="capitalize hover:text-primary transition-colors flex items-center space-x-1"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center relative"
            >
              <input
                type="search"
                name="search"
                placeholder="Search news..."
                autoComplete="off"
                value={search}
                className="input pr-10 dark:bg-gray-600 dark:border-2 dark:border-white dark:placeholder:text-gray-300 outline-none"
                onChange={(e) => setSearch(() => e.target.value)}
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
                <SunIcon className="h-5 w-5 font-bold" />
              ) : (
                <MoonIcon className="h-5 w-5 font-bold" />
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-primary  items-center space-x-2 hidden lg:flex"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="lg:flex gap-2 hidden">
                <Link
                  to="/login"
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-600    dark:hover:bg-gray-600"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
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
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    handleCategoryChange(category);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() => {
                  handleCategoryChange(category);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Signup
              </button>
              <button
                onClick={() => {
                  handleCategoryChange(category);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <form onSubmit={handleSearch} className="mt-4 px-4">
<div className="relative">
  <input
    type="search"
    name="search"
    placeholder="Search news..."
    className="input w-full pr-10"
  />
  <button
    type="submit"
    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
  >
    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
  </button>
</div>
</form> */
}

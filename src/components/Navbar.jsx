import { Link } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { setArticles, setLoading, setError } from "../store/slices/newsSlice";
import axios from "axios";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchPopup, setSearchPopup] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const categories = ["General", "Technology", "Business", "Sports"];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (searchPopup) {
      setSearchPopup(false);
    }

    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          search
        )}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      dispatch(setArticles(response.data.articles));
      setSearch("");
    } catch (error) {
      dispatch(setError(error.message));
      setSearch("");
    }
  };

  const fetchNewsWithCategory = async (category) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(
          category.toLowerCase()
        )}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      dispatch(setArticles(response.data.articles));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <>
      {searchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-2">
          <form
            onSubmit={handleSearch}
            className="relative bg-white dark:bg-gray-700 px-3 py-4 rounded-lg w-full max-w-md lg:max-w-lg shadow-lg flex flex-col gap-6"
          >
            <XMarkIcon
              className="h-6 w-6 text-gray-500 absolute top-3 right-3 dark:text-gray-100 cursor-pointer"
              onClick={() => setSearchPopup(false)}
            />

            <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Search News
            </h1>

            <div className="relative w-full">
              <input
                type="search"
                name="search"
                placeholder="Search news..."
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-96 pr-12 pl-4 py-3 rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-100" />
              </button>
            </div>
          </form>
        </div>
      )}
      <nav className="bg-white shadow-lg dark:bg-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-primary"
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

            <div className="flex items-center gap-0 lg:gap-4">
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
                onClick={() => setSearchPopup(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full lg:hidden"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => dispatch(logout())}
                  className="btn btn-primary  items-center space-x-2 lg:flex hidden"
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
                    onClick={() => fetchNewsWithCategory(category)}
                    className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {category}
                  </button>
                ))}
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

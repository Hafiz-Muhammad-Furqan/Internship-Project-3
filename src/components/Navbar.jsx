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
import { useState } from "react";
import { setArticles, setLoading, setError } from "../store/slices/newsSlice";
import axios from "axios";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchPopup, setSearchPopup] = useState(false);

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
        )}&apiKey=e922eea40c5e49d3b8f5dbfed998a3e3`
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
    <>
      {searchPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center relative bg-white dark:bg-gray-700 lg:p-6  p-6 rounded-lg outline-none w-full gap-6"
          >
            <XMarkIcon
              className="h-5 w-5 text-gray-500 absolute top-1 right-1 dark:text-gray-100 cursor-pointer"
              onClick={() => setSearchPopup(false)}
            />
            <h1 className="text-2xl font-semibold">Search News fro ever</h1>
            <div className="relative bg-red-900 w-full">
              <input
                type="search"
                name="search"
                placeholder="Search news..."
                autoComplete="off"
                value={search}
                className="input pr-10 dark:bg-gray-600 dark:border-2 w-full lg:w-96 dark:border-white dark:placeholder:text-gray-300  outline-none py-3"
                onChange={(e) => setSearch(() => e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-1 p-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 text-2xl font-bold dark:text-gray-100" />
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
                onClick={() => setSearchPopup(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full lg:hidden"
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

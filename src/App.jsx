import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewsDetail from "./pages/NewsDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setArticles, setLoading, setError } from "./store/slices/newsSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        dispatch(setArticles(response.data.articles));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    fetchNews();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Route>
    </Routes>
  );
}

export default App;

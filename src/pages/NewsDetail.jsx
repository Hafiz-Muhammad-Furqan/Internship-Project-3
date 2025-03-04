import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  CalendarIcon,
  NewspaperIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

function NewsDetail() {
  const { id } = useParams();
  const { articles } = useSelector((state) => state.news);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = articles.find((a) => a.title === id);
    setArticle(foundArticle);
    setLoading(false);
  }, [id, articles]);

  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link
          to="/"
          className="text-primary hover:underline inline-flex items-center space-x-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Return to home</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="text-primary hover:underline inline-flex items-center space-x-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to articles</span>
        </Link>
      </div>

      <h1 className="md:text-3xl text-2xl font-bold mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center space-x-2">
          <NewspaperIcon className="h-5 w-5" />
          <span>{article.source.name}</span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {(article.urlToImage || fallbackImage) && (
        <div className="relative h-[400px] mb-6">
          <img
            src={article.urlToImage || fallbackImage}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-4">{article.description}</p>
        <p>{article.content}</p>
      </div>

      <div className="mt-8">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <span>Read full article</span>
          <ArrowLeftIcon className="h-5 w-5 rotate-180" />
        </a>
      </div>
    </article>
  );
}

export default NewsDetail;

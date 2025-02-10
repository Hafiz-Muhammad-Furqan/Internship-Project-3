import { Link } from 'react-router-dom'
import { CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'

function NewsCard({ article }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop'

  return (
    <article className="card transform hover:-translate-y-1 transition-all duration-200">
      {(article.urlToImage || fallbackImage) && (
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <img
            src={article.urlToImage || fallbackImage}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackImage
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/news/${encodeURIComponent(article.title)}`}>
            {article.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <NewspaperIcon className="h-4 w-4" />
            <span>{article.source.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
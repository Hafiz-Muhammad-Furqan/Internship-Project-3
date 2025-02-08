import { useSelector } from 'react-redux'
import NewsCard from '../components/NewsCard'

function Home() {
  const { articles, loading, error, filters } = useSelector(state => state.news)

  const filteredArticles = articles.filter(article => {
    const matchesCategory = filters.category === 'general' || article.category === filters.category
    const matchesSearch = !filters.searchQuery || 
      article.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {filteredArticles[0] && (
        <section className="card p-0">
          <div className="relative h-[400px]">
            <img
              src={filteredArticles[0].urlToImage}
              alt={filteredArticles[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {filteredArticles[0].title}
              </h1>
              <p className="text-gray-200">
                {filteredArticles[0].description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Latest News Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
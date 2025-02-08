import { useSelector } from 'react-redux'
import { 
  ChartBarIcon, 
  CloudIcon,
  FireIcon
} from '@heroicons/react/24/outline'

function Sidebar() {
  const { articles } = useSelector(state => state.news)
  const trendingArticles = articles.slice(0, 5)

  return (
    <aside className="space-y-8">
      <section className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <FireIcon className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Trending News</h2>
        </div>
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-primary font-bold">{index + 1}</span>
              <p className="line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                {article.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <CloudIcon className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Weather</h2>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-4xl font-bold mb-2">23°C</div>
          <p className="text-gray-600 dark:text-gray-400">Sunny</p>
          <p className="text-sm">New York, US</p>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <ChartBarIcon className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Analytics</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Daily Visitors</span>
            <span className="font-bold">12.5K</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Articles Read</span>
            <span className="font-bold">8.2K</span>
          </div>
        </div>
      </section>
    </aside>
  )
}

export default Sidebar
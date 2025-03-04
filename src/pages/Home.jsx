import { useSelector } from "react-redux";
import NewsCard from "../components/NewsCard";

function Home() {
  const { articles, loading, error } = useSelector((state) => state.news);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {articles.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-2xl font-semibold text-gray-600 text-center dark:text-gray-200 ">
            😕 No News Found. Try searching with different keywords.
          </p>
        </div>
      )}

      {articles.length > 0 && articles[0] && (
        <a href={articles[0].url} target="_blank" rel="noopener noreferrer">
          <section className="card p-0 cursor-pointer">
            <div className="relative h-[400px]">
              <img
                src={articles[0].urlToImage}
                alt={articles[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/5 p-4">
                <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold text-white mb-2">
                  {articles[0].title}
                </h1>
                <p className="text-gray-200">{articles[0].description}</p>
              </div>
            </div>
          </section>
        </a>
      )}

      {articles.length > 1 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;

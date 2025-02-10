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
      {articles[0] && (
        <a href={articles[0].url} target="blank">
          <section className="card p-0 cursor-pointer">
            <div className="relative h-[400px]">
              <img
                src={articles[0].urlToImage}
                alt={articles[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {articles[0].title}
                </h1>
                <p className="text-gray-200">{articles[0].description}</p>
              </div>
            </div>
          </section>
        </a>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = ({ category = "general", pageSize = 8, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const updateNews = async () => {
    setProgress(10);
    setLoading(true);

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/news?category=${category}&page=1&pageSize=${pageSize}`
      );
      setProgress(70);

      const articlesData = data.articles || [];
      const trimmedArticles = articlesData.slice(1);

      setArticles(trimmedArticles);
      setTotalResults((data.totalResults || 0) - 1);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
      setTotalResults(0);
    }

    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/news?category=${category}&page=${nextPage}&pageSize=${pageSize}`
      );

      setArticles((prev) => [...prev, ...(data.articles || [])]);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((item, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={item.title || ""}
                  description={item.description || ""}
                  imageUrl={item.urlToImage}
                  newsUrl={item.url}
                  author={item.author || "Unknown"}
                  date={item.publishedAt}
                  source={item.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
 
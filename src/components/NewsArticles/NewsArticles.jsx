import { useState, useEffect } from "react";
import "./NewsArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import { getNewsData } from "../../utilities/news-api";

export default function NewsArticles({ newsArticles }) {
  const [newsList, setNewsList] = useState(newsArticles);

  return (
    <>
      <div className="news-article-list">
        {newsList.map((newsStory, idx) => (
          <NewsCard newsStory={newsStory} key={idx} />
        ))}
      </div>
    </>
  );
}

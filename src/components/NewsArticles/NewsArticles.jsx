import { useState, useEffect } from "react";
import "./NewsArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import { getNewsData } from "../../utilities/news-api";

export default function NewsArticles({ newsArticles }) {
  const [newsList, setNewsList] = useState(newsArticles);

//   useEffect(() => {
//     async function updateTransactionList() {
//       const transactionList = await getTransactions();
//       setTransactionList(transactionList);
//     }
//     updateTransactionList();
//   }, [transactions]);


  return (
    <>
    {newsList.map((newsStory, idx) => (
        <NewsCard newsStory={newsStory} key={idx}/>
    ))}
      <div>News Article 1</div>
      <div>News Article 1</div>
      <div>News Article 1</div>
      <div>News Article 1</div>
    </>
  );
}

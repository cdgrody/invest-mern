import "./NewsCard.css";

export default function NewsCard({ newsStory }) {
  return (
    <a href={newsStory.url} className="news-link" target="_blank" rel="noopener noreferrer">
      <div className="news-card">
        <img className="news-image" src={newsStory.urlToImage} alt={newsStory.title} />
        <div className="news-details">
          <div className="news-title">{newsStory.title}</div>
          <div className="news-source">{newsStory.source.name}</div>
        </div>
      </div>
    </a>
  );
}

import './NewsCard.css'

export default function NewsCard({newsStory}) {
    return(
        <>
        <img className="news-image" src={newsStory.urlToImage}/>
        <div>{newsStory.title}</div>
        </>
    )
}
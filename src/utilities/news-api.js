//api key 7fb617e482244143b760223dced04d71
const API_KEY = "7fb617e482244143b760223dced04d71";

export async function getNewsData() {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.articles.slice(0, 5);
}

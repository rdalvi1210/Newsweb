// /api/news.js
export default async function handler(req, res) {
  const { category = "general", page = 1, pageSize = 5 } = req.query;

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}

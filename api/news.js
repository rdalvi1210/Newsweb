import fetch from "node-fetch";

export default async function handler(req, res) {
  const { category = "general", page = 1, pageSize = 5 } = req.query;

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
}

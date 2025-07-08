const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.get("/api/news", async (req, res) => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const { category = "general", page = 1, pageSize = 10 } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(8000, () => {
  console.log("✅ Server listening at http://localhost:8000");
});

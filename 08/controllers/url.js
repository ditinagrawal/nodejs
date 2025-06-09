const { nanoid } = require("nanoid");
const Url = require("../models/urls");

// Create short URL:
// curl -X POST -H "Content-Type: application/json" -d '{"originalUrl":"https://www.example.com"}' http://localhost:3000/api/url/shorten

// Get and redirect to original URL:
// curl -L http://localhost:3000/api/url/{shortId}

// Get analytics:
// curl http://localhost:3000/analytics/{shortId}

async function shortenUrl(req, res) {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  const existingUrl = await Url.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({ shortUrl: existingUrl.shortUrl });
  }
  const shortId = nanoid(8);
  const shortUrl = `http://localhost:3000/${shortId}`;
  const url = await Url.create({ originalUrl, shortUrl });
  res.json({ shortUrl: url.shortUrl, originalUrl: url.originalUrl });
}

async function getUrl(req, res) {
  const { shortId } = req.params;
  const url = await Url.findOne({
    shortUrl: `http://localhost:3000/${shortId}`,
  });
  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }
  url.visits.push({ timestamp: Date.now() });
  await url.save();
  res.redirect(url.originalUrl);
}

async function getAnalytics(req, res) {
  const { shortId } = req.params;
  const url = await Url.findOne({
    shortUrl: `http://localhost:3000/${shortId}`,
  });
  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }
  res.send(`${url.visits.length} visits`);
}

module.exports = { shortenUrl, getUrl, getAnalytics };

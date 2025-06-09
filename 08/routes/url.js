const express = require("express");
const router = express.Router();

const { shortenUrl, getUrl, getAnalytics } = require("../controllers/url");

router.post("/shorten", shortenUrl);
router.get("/:shortId", getUrl);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;

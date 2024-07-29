const express = require("express");
const router = express.Router();

const {generateShortUrl, redirectToUrl, getAnalytics} = require("../controllers/url")


router.post("/",generateShortUrl)
router.get("/:shortId",redirectToUrl)
router.get("/analytics/:shortId", getAnalytics)

module.exports = router;
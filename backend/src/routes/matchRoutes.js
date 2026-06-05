const express = require("express");

const router = express.Router();

const {
  getWorldCupMatches,
  getLiveMatches
} = require("../controllers/matchController");

router.get("/", getWorldCupMatches);

router.get("/live", getLiveMatches);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
  getWorldCupMatches,
  getLiveMatches,
  getFinishedMatches,
  getTopGoalScorers,
  getMatchById
} = require("../controllers/matchController");

const {
  getStandings
} = require("../controllers/standingsController");

router.get("/", getWorldCupMatches);

router.get("/live", getLiveMatches);

router.get("/results", getFinishedMatches);

router.get("/standings", getStandings);

router.get("/top-scorers", getTopGoalScorers);

router.get("/:id", getMatchById);

module.exports = router;
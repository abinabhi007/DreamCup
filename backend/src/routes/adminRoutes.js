const express = require("express");
const router = express.Router();

const {
  updatePlayerPoints,
  recalculateTeamPoints,
  autoSyncPointsFromApi,
} = require("../controllers/adminController");

router.post(
  "/player-points",
  updatePlayerPoints
);

router.post(
  "/recalculate-team-points",
  recalculateTeamPoints
);

router.post(
  "/auto-sync-points",
  autoSyncPointsFromApi
);

module.exports = router;
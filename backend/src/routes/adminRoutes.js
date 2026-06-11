const express = require("express");
const router = express.Router();

const {
  updatePlayerPoints,
  recalculateTeamPoints,
} = require("../controllers/adminController");

router.post(
  "/player-points",
  updatePlayerPoints
);

router.post(
  "/recalculate-team-points",
  recalculateTeamPoints
);

module.exports = router;
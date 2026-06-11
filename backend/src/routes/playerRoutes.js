const express = require("express");
const router = express.Router();

const {
  getPlayers,
  syncPlayers,
  getTeams,
} = require("../controllers/playerController");

router.get("/", getPlayers);
router.post("/sync", syncPlayers);
router.get("/teams", getTeams);

module.exports = router;
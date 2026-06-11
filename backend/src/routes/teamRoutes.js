const express = require("express");
const router = express.Router();

const {
  createTeam,
  addPlayer,
  getTeam,
  removePlayer,
  setCaptain,
  setViceCaptain,
  getPlayersForMatch,
} = require("../controllers/teamController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createTeam);
router.post("/add-player", protect, addPlayer)
router.get("/", protect, getTeam)
router.delete("/remove-player/:playerId", protect, removePlayer)
router.put("/set-captain", protect, setCaptain)
router.put("/set-vice-captain", protect, setViceCaptain)
router.get("/match/:matchId", protect, getPlayersForMatch)


module.exports = router;
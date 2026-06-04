const express = require("express");
const router = express.Router();

const {
  getPlayers,
  syncPlayers,
} = require("../controllers/playerController");

router.get("/", getPlayers);
router.post("/sync", syncPlayers);

module.exports = router;
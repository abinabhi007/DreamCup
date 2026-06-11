const FantasyTeam = require("../models/FantasyTeam");
const Player = require("../models/Player");

const updatePlayerPoints = async (req, res) => {
  try {
    const { playerId, points } = req.body;

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    player.points += points;

    await player.save();

    res.json({
      success: true,
      player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const recalculateTeamPoints = async (req, res) => {
  try {
    const teams = await FantasyTeam.find()
      .populate("players")
      .populate("captain")
      .populate("viceCaptain");

    for (const team of teams) {
      let totalPoints = 0;

      // Base player points
      team.players.forEach((player) => {
        totalPoints += player.points;
      });

      // Captain gets double points
      if (team.captain) {
        totalPoints += team.captain.points;
      }

      // Vice Captain gets 1.5x
      if (team.viceCaptain) {
        totalPoints += team.viceCaptain.points * 0.5;
      }

      team.totalPoints = totalPoints;

      await team.save();
    }

    res.status(200).json({
      success: true,
      message: "Team points recalculated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updatePlayerPoints,
  recalculateTeamPoints,
};

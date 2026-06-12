const FantasyTeam = require("../models/FantasyTeam");
const Player = require("../models/Player");
const axios = require("axios");

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

const runGlobalRecalculation = async () => {
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

    // Captain gets 4x base points (total 20 if base is 5)
    // The base 1x is already added in the loop above, so add 3x here
    if (team.captain) {
      totalPoints += team.captain.points * 3;
    }

    // Vice Captain gets 3x base points (total 15 if base is 5)
    // The base 1x is already added in the loop above, so add 2x here
    if (team.viceCaptain) {
      totalPoints += team.viceCaptain.points * 2;
    }

    team.totalPoints = totalPoints;

    await team.save();
  }
};

const recalculateTeamPoints = async (req, res) => {
  try {
    await runGlobalRecalculation();

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

const autoSyncPointsFromApi = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/scorers",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const scorers = response.data.scorers;

    if (!scorers || scorers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No scorers found from API",
      });
    }

    // Reset all players points to 0 to prevent double-counting if run multiple times
    await Player.updateMany({}, { points: 0 });

    let updatedCount = 0;

    for (const scorer of scorers) {
      const playerName = scorer.player.name;
      const teamName = scorer.team.name;
      const goals = scorer.goals || 0;

      const player = await Player.findOne({ name: playerName, team: teamName });

      if (player) {
        // Assign flat 5 points per goal
        player.points = goals * 5;
        await player.save();
        updatedCount++;
      }
    }

    // Immediately trigger a global recalculation to reflect the new scores
    await runGlobalRecalculation();

    res.status(200).json({
      success: true,
      message: `Successfully synced points for ${updatedCount} players from real-world data and recalculated all fantasy teams.`,
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
  autoSyncPointsFromApi,
};

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
    const [scorersResponse, matchesResponse] = await Promise.all([
      axios.get("https://api.football-data.org/v4/competitions/WC/scorers", {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY },
      }),
      axios.get("https://api.football-data.org/v4/competitions/WC/matches", {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY },
      })
    ]);

    const scorers = scorersResponse.data.scorers || [];
    const matches = matchesResponse.data.matches || [];

    // Calculate clean sheets per team
    const teamCleanSheets = {};
    matches.forEach((match) => {
      if (match.status === "FINISHED") {
        if (match.score?.fullTime?.away === 0) {
          teamCleanSheets[match.homeTeam.name] = (teamCleanSheets[match.homeTeam.name] || 0) + 1;
        }
        if (match.score?.fullTime?.home === 0) {
          teamCleanSheets[match.awayTeam.name] = (teamCleanSheets[match.awayTeam.name] || 0) + 1;
        }
      }
    });

    // Reset all players points to 0 to prevent double-counting if run multiple times
    await Player.updateMany({}, { points: 0 });

    let updatedCount = 0;
    const allPlayers = await Player.find({});

    for (const player of allPlayers) {
      let pointsToAssign = 0;

      // 1. Goal Points (5 points per goal)
      const scorerMatch = scorers.find(
        (s) => s.player.name === player.name && s.team.name === player.team
      );
      if (scorerMatch) {
        pointsToAssign += (scorerMatch.goals || 0) * 5;
      }

      // 2. Clean Sheet Points (2 points per clean sheet for Goalkeeper/Defender)
      if (player.position === "Goalkeeper" || player.position === "Defender") {
        const cleanSheets = teamCleanSheets[player.team] || 0;
        pointsToAssign += cleanSheets * 2;
      }

      if (pointsToAssign > 0) {
        player.points = pointsToAssign;
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

const axios = require("axios");

const FantasyTeam = require("../models/FantasyTeam");
const Player = require("../models/Player");

const createTeam = async (req, res) => {
  try {
    const existingTeam =
      await FantasyTeam.findOne({
        userId: req.user._id,
      });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team already exists",
      });
    }

    const team = await FantasyTeam.create({
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addPlayer = async (req, res) => {
  try {
    const { playerId } = req.body || {};

    // Find team
    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    }).populate("players");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Create a team first",
      });
    }

    // Find player
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    // Exist Player

    const alreadyExists = team.players.some((p) => p._id.toString() === playerId);

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Player already added",
      });
    }

    // Team Limit
    if (team.players.length >= 15) {
      return res.status(400).json({
        success: false,
        message: "Team is already full",
      });
    }

    // Budget
    if (team.budgetRemaining < player.price) {
      return res.status(400).json({
        success: false,
        message: "Insufficient budget",
      });
    }

    // Position Limit 
    const positionCount = {};

    team.players.forEach((p) => {
      positionCount[p.position] = (positionCount[p.position] || 0) + 1;
    });

    const maxPerPosition = {
      Goalkeeper: 2,
      Defender: 5,
      Midfielder: 5,
      Forward: 3,
    };

    const posLimit = maxPerPosition[player.position];

    if (positionCount[player.position] >= posLimit) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${posLimit} ${player.position} allowed`,
      });
    }

    // Add Player
    team.players.push(player._id);
    team.budgetRemaining -= player.price;

    await team.save();

    res.json({
      success: true,
      message: "Player added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    })
      .populate("players")
      .populate("captain")
      .populate("viceCaptain");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;

    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    }).populate("players");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    const playerExists = team.players.some(
      (p) => p._id.toString() === playerId
    );

    if (!playerExists) {
      return res.status(400).json({
        success: false,
        message: "Player is not in your team",
      });
    }

    team.players = team.players.filter(
      (p) => p._id.toString() !== playerId
    );

    // Refund budget
    team.budgetRemaining += player.price;

    // Remove captain if deleted
    if (
      team.captain &&
      team.captain.toString() === playerId
    ) {
      team.captain = null;
    }

    // Remove vice captain if deleted
    if (
      team.viceCaptain &&
      team.viceCaptain.toString() === playerId
    ) {
      team.viceCaptain = null;
    }

    await team.save();

    res.status(200).json({
      success: true,
      message: "Player removed successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const setCaptain = async (req, res) => {
  try {
    const { playerId } = req.body;

    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    }).populate("players");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    const playerInTeam = team.players.some(
      (p) => p._id.toString() === playerId
    );

    if (!playerInTeam) {
      return res.status(400).json({
        success: false,
        message: "Player is not in your team",
      });
    }

    if (team.viceCaptain && team.viceCaptain.toString() === playerId) {
      return res.status(400).json({
        success: false,
        message: "Player is already your vice captain",
      });
    }

    team.captain = playerId;

    await team.save();

    res.status(200).json({
      success: true,
      message: "Captain updated successfully",
      captain: player.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const setViceCaptain = async (req, res) => {
  try {
    const { playerId } = req.body;

    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    }).populate("players");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    const playerInTeam = team.players.some(
      (p) => p._id.toString() === playerId
    );

    if (!playerInTeam) {
      return res.status(400).json({
        success: false,
        message: "Player is not in your team",
      });
    }

    if (team.captain && team.captain.toString() === playerId) {
      return res.status(400).json({
        success: false,
        message: "Player is already your captain",
      });
    }

    team.viceCaptain = playerId;

    await team.save();

    res.status(200).json({
      success: true,
      message: "Vice captain updated successfully",
      viceCaptain: player.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPlayersForMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    // Get match details
    const matchResponse = await axios.get(
      `https://api.football-data.org/v4/matches/${matchId}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const homeTeam =
      matchResponse.data.homeTeam.name;

    const awayTeam =
      matchResponse.data.awayTeam.name;

    // Get user's fantasy team
    const fantasyTeam = await FantasyTeam.findOne({
      userId: req.user.id,
    })
      .populate("players")
      .populate("captain")
      .populate("viceCaptain");

    if (!fantasyTeam) {
      return res.status(404).json({
        success: false,
        message: "Fantasy team not found",
      });
    }

    // Filter players belonging to either team
    const matchPlayers = fantasyTeam.players.filter(
      (player) =>
        player.team === homeTeam ||
        player.team === awayTeam
    );

    res.json({
      success: true,
      homeTeam,
      awayTeam,
      captain: fantasyTeam.captain,
      viceCaptain: fantasyTeam.viceCaptain,
      players: matchPlayers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetTeam = async (req, res) => {
  try {
    const team = await FantasyTeam.findOne({
      userId: req.user._id,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team.players = [];
    team.budgetRemaining = 100;
    team.captain = null;
    team.viceCaptain = null;

    await team.save();

    res.status(200).json({
      success: true,
      message: "Team reset successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createTeam,
  addPlayer,
  getTeam,
  removePlayer,
  setCaptain,
  setViceCaptain,
  getPlayersForMatch,
  resetTeam
};
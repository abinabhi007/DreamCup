const Player = require("../models/Player");

const getPlayers = async (req, res) => {
  try {
    const { search, position, team } = req.query;

    let query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (position) {
      query.position = {
        $regex: position,
        $options: "i",
      };
    }
    if (team) {
      query.team = {
        $regex: team,
        $options: "i",
      };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalPlayers = await Player.countDocuments(query);

    const players = await Player.find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: players.length,
      totalPlayers,
      totalPages: Math.ceil(totalPlayers / limit),
      currentPage: page,
      players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPlayers,
};
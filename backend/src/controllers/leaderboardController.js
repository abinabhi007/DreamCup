const FantasyTeam = require("../models/FantasyTeam");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await FantasyTeam.find()
      .populate("userId", "name email avatar")
      .sort({ totalPoints: -1 });

        

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};
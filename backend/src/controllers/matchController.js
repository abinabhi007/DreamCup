const axios = require("axios");

const getWorldCupMatches = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: {
          "X-Auth-Token":
            process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const matches = response.data.matches.map((match) => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeam.crest,
      awayTeamFlag: match.awayTeam.crest,
      date: match.utcDate,
      status: match.status,
      score: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away,
      },
    }));

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getLiveMatches = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/matches?status=LIVE",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const matches = response.data.matches.map((match) => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeam.crest,
      awayTeamFlag: match.awayTeam.crest,
      date: match.utcDate,
      status: match.status,
      minute: match.minute || null,
      score: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away,
      },
    }));

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWorldCupMatches,
  getLiveMatches
};
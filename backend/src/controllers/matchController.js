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

const getFinishedMatches = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED",
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
}

const getTopGoalScorers = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/scorers",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const scorers = response.data.scorers.map((scorer) => ({
      player: scorer.player.name,
      team: scorer.team.name,
      goals: scorer.goals,
    }));

    res.status(200).json({
      success: true,
      scorers,
      page,
      limit,
      totalPages: Math.ceil(scorers.length / limit),
      totalItems: scorers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getMatchById = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/matches/${req.params.id}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const match = {
      id: response.data.id,
      homeTeam: response.data.homeTeam.name,
      awayTeam: response.data.awayTeam.name,
      homeTeamFlag: response.data.homeTeam.crest,
      awayTeamFlag: response.data.awayTeam.crest,
      date: response.data.utcDate,
      venue: response.data.venue,
      status: response.data.status,
      score: {
        home: response.data.score.fullTime.home,
        away: response.data.score.fullTime.away,
        halfTime: {
          home: response.data.score.halfTime.home,
          away: response.data.score.halfTime.away,
        },
      },
      winner: response.data.score.winner,
      
    };

    res.status(200).json({
      success: true,
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
  getWorldCupMatches,
  getLiveMatches,
  getFinishedMatches,
  getTopGoalScorers,
  getMatchById
};
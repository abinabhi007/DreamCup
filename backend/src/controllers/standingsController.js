const axios = require("axios");

const getStandings = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/standings",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
        },
      }
    );

    const standings = response.data.standings.map((group) => ({
      group: group.group,
      table: group.table.map((team) => ({
        position: team.position,
        team: team.team.name,
        flag: team.team.crest,
        playedGames: team.playedGames,
        won: team.won,
        draw: team.draw,
        lost: team.lost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        points: team.points,
      })),
    }));

    res.status(200).json({
      success: true,
      standings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStandings
};
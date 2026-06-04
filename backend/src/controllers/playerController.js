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

const syncPlayers = async (req, res, next) => {
  try {
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: "FOOTBALL_DATA_API_KEY environment variable is missing on the server. Please add it to your .env file."
      });
    }

    const response = await fetch("https://api.football-data.org/v4/competitions/WC/teams", {
      headers: { "X-Auth-Token": apiKey }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `Failed to fetch data from football-data.org API: ${response.statusText}`
      });
    }

    const data = await response.json();
    const teams = data.teams;
    if (!teams || !Array.isArray(teams)) {
      return res.status(400).json({
        success: false,
        message: "Invalid response structure from football-data.org API."
      });
    }

    let importedCount = 0;
    const positionMapping = {
      // Goalkeepers
      "Goalkeeper": "Goalkeeper",
      // Defenders
      "Defender": "Defender",
      "Defence": "Defender",
      "Centre-Back": "Defender",
      "Right-Back": "Defender",
      "Left-Back": "Defender",
      "Sweeper": "Defender",
      // Midfielders
      "Midfielder": "Midfielder",
      "Midfield": "Midfielder",
      "Defensive Midfield": "Midfielder",
      "Central Midfield": "Midfielder",
      "Attacking Midfield": "Midfielder",
      "Right Midfield": "Midfielder",
      "Left Midfield": "Midfielder",
      // Forwards
      "Forward": "Forward",
      "Attacker": "Forward",
      "Offence": "Forward",
      "Centre-Forward": "Forward",
      "Right Winger": "Forward",
      "Left Winger": "Forward",
      "Striker": "Forward"
    };

    const getMappedPosition = (pos) => {
      if (!pos) return "Midfielder";
      const mapped = positionMapping[pos];
      if (mapped) return mapped;
      
      const lower = pos.toLowerCase();
      if (lower.includes("goalkeeper") || lower.includes("keeper")) return "Goalkeeper";
      if (lower.includes("back") || lower.includes("def") || lower.includes("defence")) return "Defender";
      if (lower.includes("mid") || lower.includes("center")) return "Midfielder";
      if (lower.includes("forward") || lower.includes("wing") || lower.includes("strike") || lower.includes("attack")) return "Forward";
      
      return "Midfielder";
    };

    const getDefaultPrice = (pos) => {
      switch (pos) {
        case "Forward": return Math.floor(Math.random() * 3) + 10; // 10-12
        case "Midfielder": return Math.floor(Math.random() * 3) + 8; // 8-10
        case "Defender": return Math.floor(Math.random() * 3) + 6; // 6-8
        case "Goalkeeper": return Math.floor(Math.random() * 3) + 5; // 5-7
        default: return 7;
      }
    };

    const playersToSync = [];
    for (const team of teams) {
      const teamName = team.name;
      const teamCrest = team.crest || "";
      const squad = team.squad || [];

      for (const player of squad) {
        if (!player.name) continue;
        playersToSync.push({
          name: player.name,
          team: teamName,
          position: player.position,
          crest: teamCrest
        });
      }
    }

    console.log(`Syncing ${playersToSync.length} players. Fetching photos from Wikipedia...`);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const getWikipediaPlayerImage = async (name) => {
      const fetchImage = async (title) => {
        try {
          const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=250&redirects=1`;
          let res = await fetch(url, {
            headers: { "User-Agent": "DreamCupFantasySports/1.0 (abinhn62@gmail.com)" }
          });
          if (res.status === 429) {
            await delay(1000);
            res = await fetch(url, {
              headers: { "User-Agent": "DreamCupFantasySports/1.0 (abinhn62@gmail.com)" }
            });
          }
          if (!res.ok) return null;
          const text = await res.text();
          if (text.includes("too many requests")) {
            await delay(1500);
            return null;
          }
          const data = JSON.parse(text);
          const pages = data.query?.pages;
          if (!pages) return null;
          const pageId = Object.keys(pages)[0];
          if (pageId && pageId !== "-1") {
            return {
              found: true,
              image: pages[pageId].thumbnail?.source || null
            };
          }
        } catch (e) {}
        return null;
      };

      // 1. Try direct matching
      const directResult = await fetchImage(name);
      if (directResult) {
        if (directResult.image) return directResult.image;
        return null; // Page exists but no image
      }

      // 2. Try search fallback (if page not found)
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + " footballer")}&format=json&utf8=1`;
        let res = await fetch(searchUrl, {
          headers: { "User-Agent": "DreamCupFantasySports/1.0 (abinhn62@gmail.com)" }
        });
        if (res.status === 429) {
          await delay(1000);
          res = await fetch(searchUrl, {
            headers: { "User-Agent": "DreamCupFantasySports/1.0 (abinhn62@gmail.com)" }
          });
        }
        if (!res.ok) return null;
        const text = await res.text();
        if (text.includes("too many requests")) {
          await delay(1500);
          return null;
        }
        const data = JSON.parse(text);
        const results = data.query?.search;
        if (results && results.length > 0) {
          const topTitle = results[0].title;
          const searchResult = await fetchImage(topTitle);
          if (searchResult && searchResult.image) {
            return searchResult.image;
          }
        }
      } catch (e) {}

      return null;
    };

    const chunkArray = (array, size) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    const playerChunks = chunkArray(playersToSync, 20);
    for (const chunk of playerChunks) {
      await Promise.all(chunk.map(async (player) => {
        const wikiImage = await getWikipediaPlayerImage(player.name);
        player.image = wikiImage || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.name)}`;
      }));
      await delay(200); // Respect Wikipedia API rate limit
    }

    // Now upsert all players with their real images
    for (const player of playersToSync) {
      const mappedPosition = getMappedPosition(player.position);
      await Player.findOneAndUpdate(
        { name: player.name, team: player.team },
        {
          $setOnInsert: {
            price: getDefaultPrice(mappedPosition),
            points: 0
          },
          $set: {
            position: mappedPosition,
            countryFlag: player.crest,
            image: player.image
          }
        },
        { upsert: true, new: true }
      );
      importedCount++;
    }

    res.json({
      success: true,
      message: `Successfully synchronized ${importedCount} players from ${teams.length} World Cup teams.`,
      teamsSyncedCount: teams.length,
      playersSyncedCount: importedCount
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayers,
  syncPlayers,
};
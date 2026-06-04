require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const Player = require("./src/models/Player");
const localPlayers = require("./src/data/players");

const positionMapping = {
  "Goalkeeper": "Goalkeeper",
  "Defender": "Defender",
  "Defence": "Defender",
  "Centre-Back": "Defender",
  "Right-Back": "Defender",
  "Left-Back": "Defender",
  "Sweeper": "Defender",
  "Midfielder": "Midfielder",
  "Midfield": "Midfielder",
  "Defensive Midfield": "Midfielder",
  "Central Midfield": "Midfielder",
  "Attacking Midfield": "Midfielder",
  "Right Midfield": "Midfielder",
  "Left Midfield": "Midfielder",
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

const importData = async () => {
  try {
    await connectDB();

    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    if (apiKey) {
      console.log("FOOTBALL_DATA_API_KEY found. Fetching real World Cup teams and squads...");
      
      const response = await fetch("https://api.football-data.org/v4/competitions/WC/teams", {
        headers: { "X-Auth-Token": apiKey }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from football-data.org API: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();
      const teams = data.teams;

      if (!teams || !Array.isArray(teams)) {
        throw new Error("Invalid response format from football-data.org API.");
      }

      console.log(`Successfully fetched ${teams.length} World Cup teams. Processing squad data...`);

      const playersToInsert = [];

      for (const team of teams) {
        const teamName = team.name;
        const teamCrest = team.crest || "";
        const squad = team.squad || [];

        for (const player of squad) {
          if (!player.name) continue;

          const mappedPosition = getMappedPosition(player.position);
          playersToInsert.push({
            name: player.name,
            team: teamName,
            position: mappedPosition,
            price: getDefaultPrice(mappedPosition),
            countryFlag: teamCrest,
            points: 0,
            image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(player.name)}`
          });
        }
      }

      console.log("Fetching real player photos from Wikipedia (respecting rate limits)...");
      
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

      const playerChunks = chunkArray(playersToInsert, 20);
      let processedCount = 0;

      for (const chunk of playerChunks) {
        await Promise.all(chunk.map(async (player) => {
          const wikiImage = await getWikipediaPlayerImage(player.name);
          if (wikiImage) {
            player.image = wikiImage;
          }
        }));
        processedCount += chunk.length;
        if (processedCount % 100 === 0 || processedCount === playersToInsert.length) {
          console.log(`Fetched photos for ${processedCount}/${playersToInsert.length} players...`);
        }
        await delay(200); // Wait 200ms between chunks of 20 to respect Wikipedia rate limits
      }

      if (playersToInsert.length > 0) {
        console.log(`Clearing existing players database...`);
        await Player.deleteMany();
        
        console.log(`Inserting ${playersToInsert.length} new players...`);
        await Player.insertMany(playersToInsert);
        console.log("Real World Cup players database seeded successfully! ⚽️🏆");
      } else {
        console.log("No players found in fetched squad data.");
      }
    } else {
      console.log("-------------------------------------------------------------------");
      console.log("WARNING: FOOTBALL_DATA_API_KEY environment variable is not defined.");
      console.log("To seed real teams/squads from football-data.org, obtain a token and add it to your .env file:");
      console.log("FOOTBALL_DATA_API_KEY=your_token_here");
      console.log("-------------------------------------------------------------------");
      console.log("Falling back to local baseline player seeding...");

      await Player.deleteMany();
      await Player.insertMany(localPlayers);
      console.log("Local baseline players seeded successfully.");
    }

    process.exit();
  } catch (error) {
    console.error("Error during seeding process:", error.message || error);
    process.exit(1);
  }
};

importData();
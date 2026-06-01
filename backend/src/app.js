const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DreamCup API Running 🚀",
  });
});

module.exports = app;
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

const Player = require("./src/models/Player");
const players = require("./src/data/players");

const importData = async () => {
  try {
    await connectDB();

    await Player.deleteMany();

    await Player.insertMany(players);

    console.log("Players Added Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
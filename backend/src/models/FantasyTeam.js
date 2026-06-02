const mongoose = require("mongoose");

const fantasyTeamSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],

    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },

    viceCaptain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },

    budgetRemaining: {
      type: Number,
      default: 100,
    },

    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FantasyTeam",
  fantasyTeamSchema
);
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    team: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      enum: [
        "Goalkeeper",
        "Defender",
        "Midfielder",
        "Forward",
      ],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    countryFlag:{
        type: String,
        default: ""
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
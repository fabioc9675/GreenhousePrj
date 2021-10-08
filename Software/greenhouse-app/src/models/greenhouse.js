const mongoose = require("mongoose");
const { Schema } = mongoose;

// data scheme to save data into the database
const GreenhouseScheme = new Schema(
  {
    institution: { type: String, required: true },
    numHouse: { type: Number, require: true },
    temp_env: { type: Number, default: 0 },
    mois_env: { type: Number, default: 0 },
    radi_env: { type: Number, default: 0 },
    temp_earth: { type: Array, default: [0, 0, 0, 0] },
    humi_earth: { type: Array, default: [0, 0, 0, 0] },
  },
  {
    timestamps: true,
  }
);

// how can I use the scheme as a model
module.exports = mongoose.model("Greenhouse", GreenhouseScheme);

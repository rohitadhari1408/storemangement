// 📁 server/models/Store.js
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
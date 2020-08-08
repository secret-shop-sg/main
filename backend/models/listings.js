const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const gameSchema = require("./games").game;

const listingSchema = new mongoose.Schema({
  hasItem: { type: gameSchema, required: true },
  dateListed: { type: Date, required: true },
  description: String,
  ownerID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  owner: { type: String, required: true },
  wantsItem: [gameSchema],
  sellingPrice: Number,
  rentalPrice: Number,
});

listingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Listing", listingSchema);

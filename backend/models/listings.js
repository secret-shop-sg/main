const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const listingSchema = new mongoose.Schema({
  hasItem: { type: mongoose.Types.ObjectId, ref: "Game", required: true },
  dateListed: { type: String, required: true },
  description: String,
  ownerID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  wantsItem: { type: [{ type: mongoose.Types.ObjectId, ref: "Game" }] },
  sellingPrice: Number,
  rentingPrice: Number,
});

listingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Listing", listingSchema);

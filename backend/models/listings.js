const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const listingSchema = new mongoose.Schema({
  hasItem: { type: [String, String, String], required: true },
  dateListed: { type: String, required: true },
  description: String,
  owner: { type: String, required: true },
  ownerID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  wantsItem: { type: [[String, String, String]] },
  sellingPrice: Number,
  rentingPrice: Number,
});

listingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Listing", listingSchema);

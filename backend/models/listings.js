const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const listingSchema = new mongoose.Schema({
  hasItem: {
    type: {
      gameID: { type: mongoose.Types.ObjectId, ref: "Game" },
      title: String,
      platform: String,
      imageURL: String,
    },
    required: true,
  },
  dateListed: { type: String, required: true },
  description: String,
  owner: { type: String, required: true },
  ownerID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  wantsItem: {
    type: [
      {
        _id: false,
        gameID: { type: mongoose.Types.ObjectId, ref: "Game" },
        title: String,
        platform: String,
        imageURL: String,
      },
    ],
  },
  sellingPrice: Number,
  rentingPrice: Number,
});

listingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Listing", listingSchema);

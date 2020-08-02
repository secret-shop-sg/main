const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // unique makes querying email faster
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  profilePicURL: String,
  lastLoggedIn: { type: Date, required: true },
  location: String,
  inventory: [
    {
      _id: false,
      _id: { type: mongoose.Types.ObjectId, ref: "Game" },
      title: String,
      platform: String,
      imageURL: String,
    },
  ],
  wishlist: [
    {
      _id: false,
      _id: { type: mongoose.Types.ObjectId, ref: "Game" },
      title: String,
      platform: String,
      imageURL: String,
    },
  ],
  description: String,
  listings: [{ type: mongoose.Types.ObjectId, ref: "Listing" }],
});

// throws error if fields marked as unique are not unique
userSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("User", userSchema);

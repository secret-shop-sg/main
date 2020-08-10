const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const gameSchema = require("./games").game;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // unique makes querying email faster
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  profilePicURL: String,
  // each js object is the chat log with one other individual
  chatLogs: [
    {
      _id: false,
      recipientID: { type: mongoose.Types.ObjectId, ref: "User" },
      chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    },
  ],
  lastLoggedIn: { type: Date, required: true },
  location: String,
  inventory: [gameSchema],
  wishlist: [gameSchema],
  description: String,
  listings: [{ type: mongoose.Types.ObjectId, ref: "Listing" }],
});

// throws error if fields marked as unique are not unique
userSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("User", userSchema);

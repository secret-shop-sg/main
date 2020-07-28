const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // unique makes querying email faster
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  lastLoggedIn: { type: Date },
  location: String,
  inventory: [[String, String, String]],
  // inventory format -> Game name, game platform, url. First 2 need to be sent by user, last one determined by express
  wishlist: [[String, String, String]],
  description: String,
  listings: [{ type: mongoose.Types.ObjectId, ref: "Listings" }],
});

// ensures that all fields marked with unique must be unique in database
userSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("User", userSchema);

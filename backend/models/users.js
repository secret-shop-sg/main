const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // unique makes querying email faster
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  inventory: [String],
  wishlist: [String],
});

// ensures that all fields marked with unique must be unique in database
userSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("User", userSchema);

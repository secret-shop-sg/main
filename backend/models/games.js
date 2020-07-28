const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  platform: { type: String, required: true },
  imageURL: { type: String, required: true, unique: true },
});

gameSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
module.exports = mongoose.model("Game", gameSchema);

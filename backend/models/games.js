const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  imageURL: { type: String, required: true },
});

const game = gameSchema;

//gameSchema.plugin(uniqueValidator);

// collection will be named 'users' by default
exports.gameSchema = mongoose.model("Game", gameSchema);
exports.game = game;

const Game = require("../models/games").gameSchema;
const DatabaseError = require("../models/databaseError");

const addNewGame = async (req, res, next) => {
  const { title, platform, imageURL } = req.body;
  const newGame = new Game({
    title,
    platform,
    imageURL,
  });

  try {
    await newGame.save();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.status(201).json({ gameID: newGame.id });
};

const getGames = async (req, res, next) => {
  let matchedGames;
  const queries = req.query;

  // if queries has no platform condition, all documents with a platform field would be returned
  let platform = { $exists: true };
  if (queries.platform) {
    platform = queries.platform;
  }

  // searches titles even if it is an incomplete word
  let title = { $exists: true };
  if (queries.title) {
    title = { $regex: queries.title, $options: "i" };
  }

  try {
    matchedGames = await Game.find({ platform, title }, { __v: 0 });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ matchedGames });
};

exports.addNewGame = addNewGame;
exports.getGames = getGames;

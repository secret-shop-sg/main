const Game = require("../models/games").gameSchema;
const DatabaseError = require("../models/databaseError");
const queryAndPaginate = require("../utils/queryAndPaginate");
const mongoose = require("mongoose");

const addNewGame = async (req, res, next) => {
  const { title, platform, imageURL } = req.body;
  const newGame = new Game({
    title,
    platform,
    imageURL,
  });

  try {
    // saves new game in database
    await newGame.save();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.status(201).json({ gameID: newGame.id });
};

const getGames = async (req, res) => {
  const { platform, title, gamesToHide, page } = req.body;
  let queryData;

  // searches for listings with the specific platform
  let platformQuery = {};
  if (platform) {
    platformQuery = { platform };
  }

  // searches titles even if it is an incomplete word
  let titleQuery = {};
  if (title) {
    titleQuery = {
      title: { $regex: title, $options: "i" },
    };
  }

  // games that should be hidden because the user selected it
  let gamesToHideQuery = {};
  if (gamesToHide) {
    const hiddenGames = gamesToHide.map((gameID) =>
      mongoose.Types.ObjectId(gameID)
    );

    gamesToHideQuery = { _id: { $nin: hiddenGames } };
  }

  // number of games that should be rendered onto screen
  const gamesPerPage = 5;

  try {
    queryData = await queryAndPaginate(
      Game,
      [platformQuery, titleQuery, gamesToHideQuery],
      gamesPerPage,
      page
    );
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ queryData });
};

exports.addNewGame = addNewGame;
exports.getGames = getGames;

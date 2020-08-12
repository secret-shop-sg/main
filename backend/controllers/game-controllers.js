const Game = require("../models/games").gameSchema;
const DatabaseError = require("../models/databaseError");
const queryAndPaginate = require("../utils/queryAndPaginate");

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

const getGames = async (req, res) => {
  const queries = req.query;
  let queryData;

  // if queries has no platform condition, all documents with a platform field would be returned
  let platformQuery = { _id: { $ne: null } };
  if (queries.platform) {
    platformQuery = { platform: queries.platform };
  }

  // searches titles even if it is an incomplete word
  let titleQuery = { _id: { $ne: null } };
  if (queries.title) {
    titleQuery = {
      title: { $regex: queries.title, $options: "i" },
    };
  }

  const gamesPerPage = 5;

  try {
    queryData = await queryAndPaginate(
      Game,
      [platformQuery, titleQuery],
      gamesPerPage,
      queries.page
    );
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ queryData });
};

exports.addNewGame = addNewGame;
exports.getGames = getGames;

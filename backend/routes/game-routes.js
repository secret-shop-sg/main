const gameController = require("../controllers/game-controllers");
const express = require("express");

const router = express.Router();

// used to add games temporarily
router.post("/add", gameController.addNewGame);

// used to retrieve all games that fulfil a search criteria
router.get("/", gameController.getGames);

module.exports = router;

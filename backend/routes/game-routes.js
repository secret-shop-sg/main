const gameController = require("../controllers/game-controllers");
const router = require("express").Router();

// used to add games temporarily
router.post("/add", gameController.addNewGame);

// used to retrieve all games that fulfil a search criteria
router.patch("/", gameController.getGames);

module.exports = router;

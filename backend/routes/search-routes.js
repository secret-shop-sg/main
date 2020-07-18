const express = require("express");
const searchController = require("../controllers/search-controller");

const router = express.Router();

// search whatever the user types
router.get("/keyword/:searchphrase", searchController.returnSearches);

// search all listings of a specific gaming platform
router.get(
  "/filter/platform/:platformName",
  searchController.returnSpecifiedPlatform
);

// search all listings of a specific game name/ title
router.get("/filter/title/:titleName", searchController.returnSpecifiedTitle);

module.exports = router;

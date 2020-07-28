const express = require("express");
const listingController = require("../controllers/listing-controller");
//const expressValidator = require(expressValidator)

const router = express.Router();

router.get("/id/:listingID", listingController.getListing);

router.get("/recent", listingController.getMostRecentListings);

router.post("/add", listingController.addListing);

//router.patch("/",listingController.changeListing);

module.exports = router;

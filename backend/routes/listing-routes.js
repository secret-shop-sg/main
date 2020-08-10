const listingController = require("../controllers/listing-controller");
const router = require("express").Router();
router.get("/id/:listingID", listingController.getListing);

// get the 5 most recent listings on the platform
router.get("/recent", listingController.getMostRecentListings);

router.post("/add", listingController.addListing);

//router.patch("/",listingController.changeListing);

module.exports = router;

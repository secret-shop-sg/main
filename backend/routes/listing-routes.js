const listingController = require("../controllers/listing-controller");
const checkAuth = require("../utils/checkAuth");
const router = require("express").Router();

router.get("/id/:listingID", listingController.getListing);

// get the 5 most recent listings on the platform
router.get("/recent", listingController.getMostRecentListings);

// middleware protection. Only users which are logged in can access subsequent middlewares
//router.use(checkAuth);

router.post("/add", listingController.addListing);

//router.patch("/id/:listingID",listingController.patchListing);

//router.delete("/id/:listingID", listingController.deleteListing);

module.exports = router;

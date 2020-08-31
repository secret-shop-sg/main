const listingController = require("../controllers/listing-controller");
const checkAuth = require("../utils/checkAuth");
const fileUpload = require("../utils/fileUpload");
const router = require("express").Router();

router.get("/id/:listingID", checkAuth.softAuth, listingController.getListing);

// get the 5 most recent listings on the platform
router.get("/recent", listingController.getMostRecentListings);

// add new listing
router.post(
  "/add",
  checkAuth.auth,
  // max 5 images accepted
  fileUpload.array("additionalImages", 5),
  listingController.addListing
);

//router.patch("/id/:listingID",listingController.patchListing);

router.delete("/id/:listingID", listingController.deleteListing);

module.exports = router;

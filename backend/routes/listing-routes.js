const express = require('express');
const listingController = require('../controllers/listing-controller');

const router = express.Router();

router.get("/:listingID",listingController.getListing);

module.exports = router;
const express = require('express');
const searchController = require("../controllers/search-controller")

const router = express.Router();

router.get('/keyword/:searchphrase',searchController.returnSearches);

//router.get('/category/:searchphrase') to search by category

module.exports = router;

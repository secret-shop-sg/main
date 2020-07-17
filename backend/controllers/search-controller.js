const allListings = require("../data/dummyData");
const searchAlgorithmns = require("../utils/searchAlgorithmns");

const returnSearches = (req,res,next) => {
  const searchphrase = req.params.searchphrase.split("-");
  // split searchphrase into an array of words

  let matchedListings = allListings.filter(listing=>searchAlgorithmns.searchGeneral(searchphrase,listing));
  
  res.json({matchedListings});
}

const returnSpecifiedPlatform = (req,res,next) => {
  const platform = req.params.platformName;

  let matchedListings = allListings.filter(listing=>searchAlgorithmns.searchCategory(listing,"platform",platform));

  res.json({matchedListings});
}

const returnSpecifiedTitle = (req,res,next) => {
  const titleName = req.params.titleName;

  let matchedListings = allListings.filter(listing => searchAlgorithmns.searchCategory(listing,"title",titleName))

  res.json({matchedListings});
  
}

exports.returnSearches = returnSearches;
exports.returnSpecifiedPlatform = returnSpecifiedPlatform;
exports.returnSpecifiedTitle = returnSpecifiedTitle;
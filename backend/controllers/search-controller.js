const allListings = require("../data/dummyData");
const searchAlgorithmns = require("../utils/searchAlgorithmns");

const getSearches = (req, res, next) => {
  /*
  const searchphrase = req.params.searchphrase.split("-");
  // split searchphrase into an array of words

  let matchedListings = allListings.filter(listing=>searchAlgorithmns.searchGeneral(searchphrase,listing));
  
  res.json({matchedListings}); */

  let matchedListings;
  // checks if matchedListings contains data yet
  const getListingsToUse = (matchedListings) => {
    if (matchedListings) {
      return matchedListings;
    } else return allListings;
  };

  const queries = req.query;
  if (queries.phrase) {
    const searchphrase = queries.phrase.toLowerCase().split("-");
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchGeneral(searchphrase, listing)
    );
  }
  if (queries.platform) {
    const platform = queries.platform;
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchCategory(listing, "platform", platform)
    );
  }
  if (queries.title) {
    const title = queries.title;
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchCategory(listing, "title", title)
    );
  }
  // should throw error if queries has any other params

  res.json({ matchedListings });
};

exports.getSearches = getSearches;

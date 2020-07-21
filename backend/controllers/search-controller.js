const allListings = require("../data/dummyData");
const searchAlgorithmns = require("../utils/searchAlgorithmns");

const getSearches = (req, res, next) => {
  let matchedListings;
  // checks if matchedListings contains data yet. If not use allListings
  const getListingsToUse = (matchedListings) => {
    if (matchedListings) {
      return matchedListings;
    } else return allListings;
  };

  const queries = req.query;
  // handles searches from the user typed
  if (queries.phrase) {
    const searchphrase = queries.phrase.toLowerCase().split("-");
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchGeneral(searchphrase, listing)
    );
  }
  // handles filters for different game platforms
  if (queries.platform) {
    // platforms is an array representing the different platforms selected by the user in the checkbox on the frontend
    const platforms = queries.platform.split("%");
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchFilters(listing, "platform", platforms)
    );
  }
  // handles filters for different listing types
  if (queries.listingtype) {
    // listingTypes is an array representing the different platforms selected by the user in the checkbox on the frontend
    const listingTypes = queries.listingtype.split("%");
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchFilters(listing, "listingtype", listingTypes)
    );
  }
  // TODO: direct to 404 page not found if queries has any other params

  res.json({ matchedListings });
};

exports.getSearches = getSearches;

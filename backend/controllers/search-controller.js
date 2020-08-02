const allListings = require("../data/dummyData");
const searchAlgorithmns = require("../utils/searchAlgorithmns");
const filters = require("../constants/filters");
const errorHandlers = require("../utils/errorHandlers");

const getSearches = (req, res, next) => {
  let matchedListings;

  // check if values are valid if not throw page not found error

  // checks if matchedListings contains data yet. If not use allListings
  const getListingsToUse = (matchedListings) => {
    if (matchedListings) {
      return matchedListings;
    } else return allListings;
  };

  const queries = req.query;
  errorHandlers.checkEmptyParamsError(queries);
  errorHandlers.checkFilterLabelError(
    Object.keys(queries),
    filters.FILTER_LABELS
  );

  if (queries.phrase) {
    errorHandlers.checkRepeatedParamsError(queries.phrase);
    const searchphrase = queries.phrase.toLowerCase().split("-");
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchGeneral(searchphrase, listing)
    );
  }
  // handles filters for different game platforms
  if (queries.platform) {
    errorHandlers.checkRepeatedParamsError(queries.platform);
    // platforms is an array representing the different platforms selected by the user in the checkbox on the frontend
    const platforms = queries.platform.split("%");
    errorHandlers.checkFilterLabelError(
      Object.values(platforms),
      filters.PLATFORMS_SUPPORTED
    );
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchFilters(listing, "platform", platforms)
    );
  }
  // handles filters for different listing types
  if (queries.listingtype) {
    errorHandlers.checkRepeatedParamsError(queries.platform);
    // listingTypes is an array representing the different platforms selected by the user in the checkbox on the frontend
    const listingTypes = queries.listingtype.split("%");
    errorHandlers.checkFilterLabelError(listingTypes, filters.LISTING_TYPES);
    const listingsToUse = getListingsToUse(matchedListings);
    matchedListings = listingsToUse.filter((listing) =>
      searchAlgorithmns.searchFilters(listing, "listingtype", listingTypes)
    );
  }

  res.json({ matchedListings });
};

exports.getSearches = getSearches;

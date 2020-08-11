const searchControllerErrorHandler = require("../utils/errorHandlers");
const Listing = require("../models/listings");
const DatabaseError = require("../models/databaseError");

const getSearches = async (req, res, next) => {
  let queryData;
  const queries = req.query;

  // checks if theres any error in the URL
  let hasError;
  hasError = searchControllerErrorHandler(queries);
  if (hasError) {
    return next(hasError);
  }

  //General searches keyed in by the user only searches within the title field of a game currently
  let phraseQuery = { _id: { $ne: null } };
  if (queries.phrase) {
    phraseQuery = {
      "hasItem.title": {
        $regex: queries.phrase.replace(/-/g, " "),
        $options: "i",
      },
    };
  }

  // handles queries from checking the platform checkbox
  let platformQuery = { _id: { $ne: null } };
  if (queries.platform) {
    const platforms = queries.platform.replace(/-/g, " ").split("%");
    platformQuery = { "hasItem.platform": { $in: platforms } };
  }

  // handles queries from checking the listingtype checkbox
  let listingtypeQuery = { _id: { $ne: null } };
  if (queries.listingtype) {
    const listingtypes = queries.listingtype.split("%");
    listingtypeQuery = [];
    for (listingtype of listingtypes) {
      switch (listingtype) {
        case "Trade":
          listingtypeQuery.push({ wantsItem: { $ne: [] } });
          break;
        case "Buy":
          listingtypeQuery.push({ sellingPrice: { $ne: null } });
          break;
        case "Rent":
          listingtypeQuery.push({ rentalPrice: { $ne: null } });
          break;
        default:
          break;
      }
    }
    listingtypeQuery = { $or: listingtypeQuery };
  }

  // always first page by default
  if (!queries.page) {
    queries.page = 1;
  }

  // documentLimit = maximum number of listings to show on the page
  const documentLimit = 5;
  const startIndex = parseInt(queries.page - 1) * documentLimit;
  const endIndex = parseInt(queries.page) * documentLimit;

  // queries database
  try {
    [queryData] = await Listing.aggregate([
      {
        $match: { $and: [phraseQuery, platformQuery, listingtypeQuery] },
      },
      {
        $facet: {
          matchedListings: [{ $skip: startIndex }, { $limit: documentLimit }],
          pageData: [{ $count: "count" }],
        },
      },
    ]);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // if there are matched listings
  if (queryData) {
    if (queryData.matchedListings.length > 0) {
      queryData.pageData = queryData.pageData[0];
      queryData.pageData.currentPage = parseInt(queries.page) || 1;

      if (startIndex > 0) {
        queryData.pageData.previousPage = true;
      } else queryData.pageData.previousPage = false;

      if (endIndex < queryData.pageData.count) {
        queryData.pageData.nextPage = true;
      } else queryData.pageData.nextPage = false;
    }
  }

  res.json({ queryData });
};

exports.getSearches = getSearches;

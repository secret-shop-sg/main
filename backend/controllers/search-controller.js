const searchControllerErrorHandler = require("../utils/errorHandlers");
const Listing = require("../models/listings");
const DatabaseError = require("../models/databaseError");

const getSearches = async (req, res, next) => {
  let matchedListings;
  const queries = req.query;

  let hasError;
  hasError = searchControllerErrorHandler(queries);
  if (hasError) {
    return next(hasError);
  }

  //General searches keyed in by the user only searches within the title field of a game currently
  let phraseQuery = { _id: { $exists: true } };
  if (queries.phrase) {
    phraseQuery = {
      "hasItem.title": {
        $regex: queries.phrase.replace(/-/g, " "),
        $options: "i",
      },
    };
  }

  // handles queries from checking the platform checkbox
  let platformQuery = { _id: { $exists: true } };
  if (queries.platform) {
    const platforms = queries.platform.replace(/-/g, " ").split("%");
    platformQuery = { "hasItem.platform": { $in: platforms } };
  }

  // handles queries from checking the listingtype checkbox
  let listingtypeQuery = { _id: { $exists: true } };
  if (queries.listingtype) {
    const listingtypes = queries.listingtype.split("%");
    listingtypeQuery = [];
    for (listingtype of listingtypes) {
      switch (listingtype) {
        case "Trade":
          listingtypeQuery.push({ wantsItem: { $ne: [] } });
          break;
        case "Buy":
          listingtypeQuery.push({ sellingPrice: { $exists: true } });
          break;
        case "Rent":
          listingtypeQuery.push({ rentalPrice: { $exists: true } });
          break;
        default:
          break;
      }
    }
    listingtypeQuery = { $or: listingtypeQuery };
  }

  // queries database
  try {
    matchedListings = await Listing.find(
      {
        $and: [phraseQuery, platformQuery, listingtypeQuery],
      },
      { __v: 0 }
    );
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ matchedListings });
};

exports.getSearches = getSearches;

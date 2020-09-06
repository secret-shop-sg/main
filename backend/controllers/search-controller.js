const searchControllerErrorHandler = require("../utils/errorHandlers");
const queryAndPaginate = require("../utils/queryAndPaginate");
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
  let phraseQuery = {};
  if (queries.phrase) {
    phraseQuery = {
      "hasItem.title": {
        $regex: queries.phrase.replace(/-/g, " "),
        $options: "i",
      },
    };
  }

  // handles queries from checking the platform checkbox
  let platformQuery = {};
  if (queries.platform) {
    const platforms = queries.platform.replace(/-/g, " ").split("%");
    platformQuery = { "hasItem.platform": { $in: platforms } };
  }

  // handles queries from checking the listingtype checkbox
  let listingtypeQuery = {};
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

  let sortBy;
  if (queries.sortby) {
    if (queries.sortby === "popularity") {
      sortBy = { bookmarkCount: -1 };
    }
  }

  const listingPerPage = 5;
  // query to retrieve owner's profile pic by performing a left join
  const ownerPicQuery = {
    $lookup: {
      from: "users",
      let: { ownerID: "$ownerID" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$ownerID"] } } },
        { $project: { profilePicURL: 1, _id: 0 } },
      ],
      as: "ownerProfilePic",
    },
  };

  try {
    // include pagination in returned results
    queryData = await queryAndPaginate(
      Listing,
      [phraseQuery, platformQuery, listingtypeQuery],
      listingPerPage,
      queries.page,
      ownerPicQuery,
      sortBy
    );
  } catch (err) {
    // error handling alr included in queryAndPaginate function
    return next(new DatabaseError(err.message));
  }

  res.json({ queryData });
};

exports.getSearches = getSearches;

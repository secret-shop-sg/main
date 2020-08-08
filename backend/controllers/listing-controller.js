const Listing = require("../models/listings");
const User = require("../models/users");
const mongoose = require("mongoose");
const DatabaseError = require("../models/databaseError");

// To be eventually added
// const updateListing
// const deleteLising

/*
const getMultipleListings = async (req, res, next) => {
  const listingIDs = req.body.listingIDs;
  let listingsData = [];

  if (listingIDs) {
    for (id of listingIDs) {
      let listingData;
      try {
        listingData = await Listing.findById(id);
        listingsData.push(listingData);
      } catch (err) {
        return next(new DatabaseError(err.message));
      }
    }
  }

  res.json({ listingsData });
};
*/

const getListing = async (req, res, next) => {
  const listingID = req.params.listingID;
  const similarListingsCount = 3;
  let listingToDisplay;
  let platform;
  let similarListings;

  try {
    listingToDisplay = await Listing.findById(listingID, { __v: 0 });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (listingToDisplay) {
    platform = listingToDisplay.hasItem.platform;
    try {
      similarListings = await Listing.aggregate([
        {
          $match: {
            $and: [
              { "hasItem.platform": platform },
              { _id: { $ne: mongoose.Types.ObjectId(listingID) } },
            ],
          },
        },
        { $sample: { size: similarListingsCount } },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "username",
          },
        },
      ]);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }

  res.json({ listingToDisplay, similarListings });
};

const addListing = async (req, res, next) => {
  // optional parameters should be passed as null
  const {
    hasItem,
    description,
    ownerID,
    owner,
    wantsItem,
    sellingPrice,
    rentalPrice,
  } = req.body;

  if (description) {
    description = "";
  }

  const dateListed = new Date();
  let user;

  // new listing to be pushed to db
  const newListing = Listing({
    hasItem,
    description,
    ownerID,
    owner,
    wantsItem,
    sellingPrice,
    rentalPrice,
    dateListed,
  });

  // finds the owner of listing to add listing to his data
  try {
    user = await User.findById(ownerID);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // preventive measure in case owner is wrong.
  // Should not happen because you have to be logged in to post listings
  if (!user) {
    const error = new Error("Cannot find user with the provided ID");
    error.status = 404;
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newListing.save({ session });
    // save listing in user DB
    user.listings.push(newListing);

    // if game in listing is not in inventory, add in inventory
    if (!user.inventory.some((game) => game._id == hasItem._id)) {
      user.inventory.push(hasItem);
    }

    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.status(201).json({ listingID: newListing.id });
};

const getMostRecentListings = async (req, res, next) => {
  const documentCount = 5;
  let mostRecentListings;

  try {
    mostRecentListings = await Listing.find({}, { __v: 0 })
      .sort({ dateListed: "descending" })
      .limit(documentCount);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ mostRecentListings });
};

exports.getListing = getListing;
exports.addListing = addListing;
exports.getMostRecentListings = getMostRecentListings;

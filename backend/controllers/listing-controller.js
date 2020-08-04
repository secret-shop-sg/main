const allListings = require("../data/dummyData");
const Listing = require("../models/listings");
const User = require("../models/users");
const mongoose = require("mongoose");
const DatabaseError = require("../models/databaseError");
const listings = require("../models/listings");

// To be eventually added
// const updateListing
// const deleteLising

/*
const getListing = (req, res, next) => {
  const listingID = req.params.listingID;

  const listingToDisplay = allListings.find(
    (listing) => listing.listingId.toString() === listingID
  );
  if (listingToDisplay) {
    const selectedPlatform = listingToDisplay.platform;
    // find all other games on the same platform
    const otherListings = allListings.filter(
      (listing) =>
        listing.listingId.toString() !== listingID &&
        listing.platform === selectedPlatform
    );
    // similarListings = 3 random listings on the same platform
    let similarListings = [];

    while (similarListings.length < 3 && otherListings.length > 0) {
      const randomNum = Math.floor(Math.random() * otherListings.length);
      const [randomListing] = otherListings.splice(randomNum, 1);
      similarListings.push(randomListing);
    }

    // remove empty listings if there are < 3 games on the same platform
    similarListings = similarListings.filter((listing) => listing.length != 0);
    res.json({ listingToDisplay, similarListings });
  } else res.json({ listingToDisplay });
}; */

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

const getListing = async (req, res, next) => {
  const listingID = req.params.listingID;
  let listingToDisplay;
  let platform;
  let similarListings;

  try {
    listingToDisplay = await Listing.findById(listingID, { __v: 0 })
      .populate({
        path: "ownerID",
        select: "username",
      })
      .populate("hasItem wantsItem", { __v: 0 });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  /*
  if (listingToDisplay) {
    try {
      similarListings = await Listing.find({
        $and: [
          { _id: { $ne: listingID } },
          { platform: listingToDisplay.platform },
        ],
      }).limit(3);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }
  */

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

  // preventive measure in case ownerID is wrong.
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
    if (!user.inventory.includes(hasItem)) {
      user.inventory.push(hasItem);
    }

    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.status(201).json({ listingID: newListing.id });
};
const getMostRecentListings = (req, res, next) => {
  let elementCount = 5;
  let mostRecentListings = allListings.slice(0, elementCount);

  // sorts the first n listing dates in ascending order
  mostRecentListings.sort((a, b) => {
    if (a.dateListed > b.dateListed) {
      return 1;
    } else if (a.dateListed < b.dateListed) {
      return -1;
    } else return 0;
  });

  for (listing of allListings.slice(elementCount)) {
    for (i = 0; i < mostRecentListings.length; i++) {
      // if incoming listing is the newest listing in the mostRecentListings array
      if (i === mostRecentListings.length - 1) {
        let prevListing = listing;
        for (j = i; j >= 0; j--) {
          [mostRecentListings[j], prevListing] = [
            prevListing,
            mostRecentListings[j],
          ];
        }
      } else if (listing.dateListed < mostRecentListings[i].dateListed) {
        if (i > 0) {
          let prevListing = listing;
          for (j = i - 1; j >= 0; j--) {
            [mostRecentListings[j], prevListing] = [
              prevListing,
              mostRecentListings[j],
            ];
          }
          break;
        }
      }
    }
  }

  res.json({ mostRecentListings });
};
/*
const getMostRecentListings = async (req, res, next) => {
  const documentCount = 5;
  let matchedListings;

  try {
    matchedListings = await Listing.find({}, { __v: 0 })
      .sort({ dateListed: "descending" })
      .populate("hasItem wantsItem", { __v: 0 })
      .limit(documentCount);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ matchedListings });
}; */

exports.getMultipleListings = getMultipleListings;
exports.getListing = getListing;
exports.addListing = addListing;
exports.getMostRecentListings = getMostRecentListings;

const Listing = require("../models/listings");
const User = require("../models/users");
const mongoose = require("mongoose");
const DatabaseError = require("../models/databaseError");

// To be eventually added
// const updateListing

const getListing = async (req, res, next) => {
  //const listingID = req.params.listingID;
  const listingID = "5f3a7a9834597ec054fa0046";
  const userID = "5f33ad3f2e507a110615b5f2";
  //const userID = req.userID;
  const similarListingsCount = 3;
  let listingToDisplay;
  let platform;
  let similarListings;

  try {
    listingToDisplay = (
      await Listing.findById(listingID, { __v: 0 }).populate(
        "ownerID",
        "profilePicURL bookmarks"
      )
    ).toObject();

    if (!listingToDisplay) {
      throw new DatabaseError();
    }
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  const user = listingToDisplay.ownerID;
  // indicates if current listing belongs to user so he has the option to edit it
  if (userID === user._id.toString()) {
    listingToDisplay.userIsOwner = true;
  }
  delete user._id;

  if (user.bookmarks.some((bookmark) => bookmark == listingID)) {
    listingToDisplay.wasBookmarked = true;
  }
  delete user.bookmarks;

  //platform = listingToDisplay.hasItem.platform;
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
    ]);
    await User.populate(similarListings, {
      path: "ownerID",
      select: "profilePicURL",
    });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ listingToDisplay, similarListings });
};

const addListing = async (req, res, next) => {
  // optional parameters should be passed as null
  const {
    hasItem,
    description,
    wantsItem,
    sellingPrice,
    rentalPrice,
  } = req.body;
  const userID = req.userID;

  if (description) {
    description = "";
  }
  let user;

  // finds the owner of listing to add listing to his data
  try {
    user = await User.findById(userID);
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

  // new listing to be pushed to db
  const newListing = Listing({
    hasItem,
    description,
    ownerID: userID,
    owner: user.username,
    wantsItem,
    sellingPrice,
    rentalPrice,
    dateListed: new Date(),
  });

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
      .populate("ownerID", "profilePicURL")
      .sort({ dateListed: "descending" })
      .limit(documentCount);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ mostRecentListings });
};

// not functioning properly
const deleteListing = async (req, res, next) => {
  const listingID = req.params.listingID;
  const userID = req.userID;
  let listing;
  let owner;

  try {
    listing = await Listing.findById(listingID);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // if listing to delete does not exist
  if (!listing) {
    return next(new DatabaseError("No listings found"));
  }

  try {
    owner = await User.findById(listing.ownerID);
  } catch (err) {
    return next(new DatabaseError("UserID not found in database"));
  }

  if (owner._id != userID) {
    return next(
      new DatabaseError("User is not authorized to delete this listing")
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Listing.findByIdAndDelete(listingID, { session });
    owner.listings.pull(listingID);
    await owner.save({ session });
    await session.commitTransaction;
  } catch (err) {
    return next(new DatabaseError(err.message));
  }
  res.json({ listingDeleted: true });
};

exports.getListing = getListing;
exports.addListing = addListing;
exports.deleteListing = deleteListing;
exports.getMostRecentListings = getMostRecentListings;

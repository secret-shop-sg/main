const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Listing = require("../models/listings");
const User = require("../models/users");
const DatabaseError = require("../models/databaseError");
const {
  DEFAULT_PROFILE_PIC,
  SECRET_JWT_HASH,
} = require("../constants/details");

const addNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  let hashedPassword;
  // 12 is the strength of the hash
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePicURL: DEFAULT_PROFILE_PIC,
    description: "",
    dateJoined: new Date(),
    lastLoggedIn: new Date(),
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // todo: Add expiry to accesstoken
  accessToken = jwt.sign({ userID }, SECRET_JWT_HASH);

  // for log out -> maxAge:0
  // cookie expires in 3hrs
  // secure cookie meant for user authentication
  res.cookie("access_token", accessToken, {
    maxAge: 10800000,
    httpOnly: true,
    // uncomment secure in production when we switch to https
    //secure: true
  });

  // cookie expires in 3hrs
  // cookie for frontend to know username. Deleted if not needed
  res.cookie("username", username, { maxAge: 10800000 });

  res.status(201).json({ signedIn: true });
};

// function to validate email and username
const validateField = async (req, res, next) => {
  const [field] = Object.keys(req.body);
  let existingUser;
  let isValid;
  let hasLoaded;

  try {
    if (field === "email") {
      existingUser = await User.findOne({ email: req.body[field] });
      hasLoaded = true;
    } else if (field === "username") {
      existingUser = await User.findOne({ username: req.body[field] });
      hasLoaded = true;
    }
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (hasLoaded) {
    if (existingUser) {
      isValid = false;
    } else isValid = true;

    res.json({ isValid });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  let validCredentials;
  let userID;
  let accessToken;

  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // if user cannot be found -> username is wrong
  if (!existingUser) {
    validCredentials = false;
  } else {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    // if password is wrong
    if (!isValidPassword) {
      validCredentials = false;
    } else {
      // updates when the user successfully logs in
      existingUser.lastLoggedIn = new Date();
      try {
        await existingUser.save();
      } catch (err) {
        return next(new DatabaseError(err.message));
      }

      userID = existingUser.id;
      validCredentials = true;

      // todo: Add expiry to accesstoken
      accessToken = jwt.sign({ userID }, SECRET_JWT_HASH);

      // for log out -> maxAge:0
      // cookie expires in 3hrs
      // secure cookie meant for user authentication
      res.cookie("access_token", accessToken, {
        maxAge: 10800000,
        httpOnly: true,
        // uncomment secure in production when we switch to https
        //secure: true
      });

      // cookie expires in 3hrs
      // cookie for frontend to know username. Deleted if not needed
      res.cookie("username", username, { maxAge: 10800000 });
    }
  }

  res.json({ validCredentials });
};

const getAuthorizedUser = async (req, res, next) => {
  const userID = req.body.userID;

  let matchedUser;

  // todo: add error handling in the event that id sent is not 24 chars
  if (userID.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      matchedUser = await User.findById(userID, { __v: 0 }).populate({
        path: "listings",
        select: { __v: 0 },
      });
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }

  matchedUser.password;

  res.json({ matchedUser });
};

const getUserbyName = async (req, res, next) => {
  const username = req.params.username;
  let matchedUser;

  try {
    matchedUser = await User.findOne({ username }, { __v: 0 }).populate({
      path: "listings",
      select: { __v: 0 },
    });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.json({ matchedUser });
};

const updateProfileDetails = async (req, res, next) => {
  const userID = req.body.userID;
  const updatedInfo = req.body;
  let fileToUnlink;
  let error;

  // remove all fields with null or undefined values
  for (var property in updatedInfo) {
    if (
      updatedInfo[property] === null ||
      updatedInfo[property] === undefined ||
      property == "userID"
    ) {
      delete updatedInfo[property];
    }
  }

  // finds the user to update
  let matchedUser;

  try {
    matchedUser = await User.findById(userID);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (matchedUser) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      if (req.file) {
        // queues the old profile pic for deletion if there is a new pic exists
        if (matchedUser.profilePicURL != DEFAULT_PROFILE_PIC) {
          fileToUnlink = matchedUser.profilePicURL.substring(1);
        }
        // creates a new file path to where the user profile pic is stored
        matchedUser.profilePicURL = "/" + req.file.path;
      }

      // iterates through whatever fields have updates and update them in the matchedUser
      Object.keys(updatedInfo).forEach(
        (key) => (matchedUser[key] = updatedInfo[key])
      );

      await matchedUser.save({ session });

      // if the username updated, find all of the user's listing and update the owner field
      if (updatedInfo.username !== matchedUser.username) {
        for (listingID of matchedUser.listings) {
          const listing = await Listing.findById(listingID);
          listing.owner = updatedInfo.username;
          await listing.save({ session });
        }
      }

      await session.commitTransaction();
    } catch (err) {
      // if transaction fail, queue the image file that has been uploaded for deletion instead
      if (req.file) {
        fileToUnlink = req.file.path;
      }
      error = err;
    }

    if (fileToUnlink) {
      fs.unlink(fileToUnlink, function (err) {
        console.log("Error while deleting files", err);
      });
    }

    if (error) {
      return next(new DatabaseError(error.message));
    }
  }

  res.json({ userID });
};

const updateInventory = async (req, res, next) => {
  const inventory = req.body.inventory;
  const userID = req.userID;

  // even if inventory is empty, it would be an empty array
  if (inventory) {
    // finds the user to update
    let matchedUser;

    try {
      matchedUser = await User.findById(userID);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    if (matchedUser) {
      matchedUser.inventory = inventory;
    }
    try {
      await matchedUser.save();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
    res.json({ dataUpdated: true });
  }
};

const updateWishlist = async (req, res, next) => {
  const wishlist = req.body.wishlist;
  const userID = req.userID;

  if (wishlist) {
    // finds the user to update
    let matchedUser;

    try {
      matchedUser = await User.findById(userID);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    if (matchedUser) {
      matchedUser.wishlist = wishlist;
    }
    // todo: throw some error
    try {
      await matchedUser.save();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }
  // todo: proper status handling
  res.json({ dataUpdated: true });
};

exports.updateInventory = updateInventory;
exports.updateWishlist = updateWishlist;
exports.updateProfileDetails = updateProfileDetails;
exports.addNewUser = addNewUser;
exports.getAuthorizedUser = getAuthorizedUser;
exports.getUserbyName = getUserbyName;
exports.validateField = validateField;
exports.login = login;

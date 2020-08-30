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
  LOG_IN_DURATION,
} = require("../constants/details");

// not middleware but called when creating cookie
const newCookie = (res, userID, username) => {
  const accessToken = jwt.sign({ userID }, SECRET_JWT_HASH, {
    expiresIn: "3h",
  });

  // cookie expires in 3hrs
  // secure cookie meant for user authentication
  res.cookie("access_token", accessToken, {
    maxAge: LOG_IN_DURATION,
    httpOnly: true,
    // uncomment secure in production when we switch to https
    //secure: true
  });

  // cookie expires in 3hrs
  // cookie for frontend to know username. Deleted if not needed
  res.cookie("username", username, { maxAge: LOG_IN_DURATION });
};

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

  newCookie(res, userID, username);

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

      newCookie(res, userID, username);
    }
  }

  res.json({ validCredentials });
};

const logout = async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("username");

  res.json({ loggedOut: true });
};

const getAuthorizedUser = async (req, res, next) => {
  const userID = req.userID;

  let matchedUser;

  try {
    matchedUser = await User.findById(userID, { __v: 0 }).populate({
      path: "listings",
      select: { __v: 0 },
    });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

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

// does not work because of fileupload middleware
const updateProfileDetails = async (req, res, next) => {
  const userID = req.userID;
  const updatedInfo = req.body;
  let fileToUnlink;
  let error;

  // remove all fields with null or undefined values
  for (var property in updatedInfo) {
    if (!updatedInfo[property]) {
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

  if (!matchedUser) {
    return next(new DatabaseError("UserID not found in database"));
  }

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

      // change the cookies that the user is used to log in with
      newCookie(res, userID, updatedInfo.username);
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

  res.json({ dataUpdated: true });
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
    } else {
      return next(new DatabaseError("UserID not found in database"));
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
    } else {
      return next(new DatabaseError("UserID not found in database"));
    }

    try {
      await matchedUser.save();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }
  // todo: proper status handling
  res.json({ dataUpdated: true });
};

const updatePassword = async (req, res, next) => {
  const userID = req.userID;
  const { oldPassword, newPassword } = req.body;
  let dataUpdated = false; // by default not valid password
  let existingPassword;
  let hashedPassword;

  try {
    existingPassword = (
      await User.findById(userID, {
        password: 1,
        _id: 0,
      })
    ).password;
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  const isValidPassword = await bcrypt.compare(oldPassword, existingPassword);
  if (isValidPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 12);
    try {
      await User.findByIdAndUpdate(userID, { password: hashedPassword });
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
    dataUpdated = true;
  }
  res.json({ dataUpdated });
};

exports.updateInventory = updateInventory;
exports.updateWishlist = updateWishlist;
exports.updateProfileDetails = updateProfileDetails;
exports.addNewUser = addNewUser;
exports.getAuthorizedUser = getAuthorizedUser;
exports.getUserbyName = getUserbyName;
exports.validateField = validateField;
exports.login = login;
exports.logout = logout;
exports.updatePassword = updatePassword;

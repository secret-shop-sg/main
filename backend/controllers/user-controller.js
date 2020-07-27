const User = require("../models/users");
const DatabaseError = require("../models/databaseError");
const utilFunctions = require("../utils/utilFunctions");

const addNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
    dateJoined: new Date(),
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  res.status(201).json({ userID: newUser.id });
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

  if (!existingUser || existingUser.password !== password) {
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
  }

  res.json({ validCredentials, userID });
};

const getUser = async (req, res, next) => {
  const userID = req.params.userID;
  let matchedUser;

  if (userID.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      matchedUser = await User.findById(userID);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }

  let { inventory, wishlist } = matchedUser;

  if (inventory) {
    inventory = utilFunctions.addImageURL(inventory);
  }

  if (wishlist) {
    wishlist = utilFunctions.addImageURL(wishlist);
  }

  matchedUser.wishlist = wishlist;
  matchedUser.inventory = inventory;

  res.json({ matchedUser });
};

const updateProfile = async (req, res, next) => {
  const { inventory, wishlist, location, userID } = req.body;
  let matchedUser;

  try {
    matchedUser = await User.findById(userID);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (matchedUser) {
    matchedUser.wishlist = wishlist;
    matchedUser.inventory = inventory;
    matchedUser.location = location;

    try {
      await matchedUser.save();
    } catch {
      return next(new DatabaseError(err.message));
    }
  }
};

exports.updateProfile = updateProfile;
exports.addNewUser = addNewUser;
exports.getUser = getUser;
exports.validateField = validateField;
exports.login = login;

const User = require("../models/users");
const DatabaseError = require("../models/databaseError");

const addNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
    dateJoined: new Date(),
    lastLoggedIn: new Date(),
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

  res.json({ matchedUser });
};

const updateProfile = async (req, res, next) => {
  const userID = req.params.userID;
  const updatedInfo = req.body;

  // remove all fields with null or undefined values
  for (var property in updatedInfo) {
    if (updatedInfo[property] === null || updatedInfo[property] === undefined) {
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
    if (req.file) {
      matchedUser.profilePicURL = req.file.path;
    }

    // iterates through whatever fields have updates and update them in the matchedUser
    Object.keys(updatedInfo).forEach(
      (key) => (matchedUser[key] = updatedInfo[key])
    );
    try {
      await matchedUser.save();
    } catch {
      return next(new DatabaseError(err.message));
    }
  }
  res.json({ userID });
};

exports.updateProfile = updateProfile;
exports.addNewUser = addNewUser;
exports.getUser = getUser;
exports.validateField = validateField;
exports.login = login;

const User = require("../models/users");
const DatabaseError = require("../models/databaseError");

const addNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
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

  try {
    if (field === "email") {
      existingUser = await User.findOne({ email: req.body[field] });
    } else if (field === "username") {
      existingUser = await User.findOne({ username: req.body[field] });
    }
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (existingUser) {
    isValid = false;
  } else isValid = true;

  res.json({ isValid });
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

exports.addNewUser = addNewUser;
exports.getUser = getUser;
exports.validateField = validateField;
exports.login = login;

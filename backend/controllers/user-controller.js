const allUsers = require("../data/userData");

const addNewUser = (req, res, next) => {
  const { username, email, location, inventory } = req.body;

  // returns undefined if not found
  const existingUser = allUsers.find((user) => user.email === email);
  // checks that no other email addresses
  if (existingUser) {
    const error = new Error(
      "There is a registered account with this email address. Would you like to log in instead?"
    );
    error.code = 401;
    return next(error);
  }

  // assigns new id = userID of last user +1
  const newID = allUsers[allUsers.length - 1].userID + 1;

  const createdUser = { username, userID: newID, email, location, inventory };

  // add createdPlace to mongoDB here
  res.status(201).json({ createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
};

const getUser = (req, res, next) => {
  const userID = req.params.userID;
  const matchedUser = allUsers.find((user) => user.userID == userID);
  res.json({ matchedUser });
};

exports.addNewUser = addNewUser;
exports.getUser = getUser;
exports.login = login;

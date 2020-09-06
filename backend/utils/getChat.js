const { SECRET_JWT_HASH } = require("../constants/details");
const jwt = require("jsonwebtoken");
const DatabaseError = require("../models/databaseError");

const getChat = (access_token) => {
  let userID;
  jwt.verify(access_token, SECRET_JWT_HASH, (err, data) => {
    if (err) {
      throw new DatabaseError(err.message);
    }
    userID = data.userID;
  });

  return userID;
};

module.exports = getChat;

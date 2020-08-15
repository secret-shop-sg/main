const { SECRET_JWT_HASH } = require("../constants/details");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // obtain web token from the string set in the header of the req
    const token = req.cookies.access_token;
    if (!token) {
      const error = new Error("Authentication failed");
      error.status = 401;
      throw error;
    }

    jwt.verify(token, SECRET_JWT_HASH, (err, userID) => {
      if (err) return res.sendStatus(403);
      req.userID = userID;
      next();
    });

    next();
  } catch (err) {
    return next(err);
  }
};

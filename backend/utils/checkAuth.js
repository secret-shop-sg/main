module.exports = (req, res, next) => {
  try {
    // obtain token from the string set in the header of the req
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("Authentication failed");
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    return next(err);
  }
};

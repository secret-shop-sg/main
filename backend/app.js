const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const searchRoutes = require("./routes/search-routes");
const listingRoutes = require("./routes/listing-routes");
const userRoutes = require("./routes/user-routes");
const gameRoutes = require("./routes/game-routes");

const app = express();

// Only accepts requests with data in JSON format
app.use(bodyParser.json());

app.use("/images", express.static("images"));

// Boilerplate to bypass CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// api requests for searches/filters
app.use("/api/search", searchRoutes);

// api requests for listings
app.use("/api/listing", listingRoutes);

// api requests for user info/ login/signup
app.use("/api/user", userRoutes);

// api requests for images of games
app.use("/api/game", gameRoutes);

// if api calls a wrong address
app.use((req, res, next) => {
  const error = new Error(
    "API endpoint not valid. Note that it is case sensitive"
  );
  error.status = 400;

  return next(error);
});

// custom error handler if any middleware threw an error
app.use((error, req, res, next) => {
  // delete profile pic that have been added if theres an error
  if (req.file) {
    fs.unlink(req.file.path);
  }

  // calls express' default error handler if res has already been sent
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.status || 500);
  res.json({
    message: error.message || "An unknown error has occured on the server",
    status: error.status || 500,
  });
});

mongoose
  .connect(
    "mongodb+srv://admin:8cfrMF1Y6UCM5nc0@linkdb.f9q9h.mongodb.net/users?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(5000))
  .catch((err) => {
    console.log(err);
  });

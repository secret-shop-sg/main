const bodyParser = require("body-parser");
const express = require("express");
const searchRoutes = require("./routes/search-routes");
const listingRoutes = require("./routes/listing-routes");
const userRoutes = require("./routes/user-routes");
const mongoose = require("mongoose");

const app = express();

// Only accepts requests with data in JSON format
app.use(bodyParser.json());

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
  if (res.headerSent) {
    // calls express' default error handler if res has already been sent
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
    "mongodb+srv://admin:8cfrM1Y6UCM5nc0@linkdb.f9q9h.mongodb.net/users?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => app.listen(5000))
  .catch((err) => {
    console.log(err);
  });

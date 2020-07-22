const bodyParser = require("body-parser");
const express = require("express");
const searchRoutes = require("./routes/search-routes");
const listingRoutes = require("./routes/listing-routes");
const userRoutes = require("./routes/user-routes");

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
  const error = new Error("Page not found. Check if your API endpoint is valid");
  error.code = 404;

  throw error;
});

app.listen(5000);

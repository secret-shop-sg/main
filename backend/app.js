const bodyParser = require('body-parser');
const express = require('express');
const searchRoutes = require("./routes/search-routes");
const listingRoutes = require("./routes/listing-routes");

const app = express();

// Only accepts requests with data in JSON format
app.use(bodyParser.json());


// Boilerplate to bypass CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

// api requests from searches
app.use('/api/search',searchRoutes);

app.use('/api/listing',listingRoutes);

// if api calls a wrong address
app.use((req,res,next)=>{
    const error = new Error();
    error.code = 404;
    error.message = "Page not found. Check if your API endpoint is valid";

    throw(error);
})

app.listen(5000);



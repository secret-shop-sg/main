const DUMMYLISTINGS = require( "../data/dummyData");

// To be eventually added
// const newListing
// const updateListing
// const deleteLising

const getListing = (req,res,next) => {
    const listingID = req.params.listingID;
    const allListings = DUMMYLISTINGS;

    const listingToDisplay = allListings.find(listing=> listing.listingId.toString() === listingID);
    res.json({listingToDisplay});
}

exports.getListing = getListing;
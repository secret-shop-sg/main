const DUMMYLISTINGS = require( "../data/dummyData");

// To be eventually added
// const newListing
// const updateListing
// const deleteLising

const getListing = (req,res,next) => {
    const listingID = req.params.listingID;
    const allListings = DUMMYLISTINGS;

    const listingToDisplay = allListings.find(listing=> listing.listingId.toString() === listingID);
    const selectedPlatform = listingToDisplay.platform;
    // find all other games on the same platform
    const otherListings = allListings.filter(listing => 
        (listing.listingId.toString() !== listingID) && (listing.platform === selectedPlatform)
    );
    // similarListings = 3 random listings on the same platform 
    let similarListings = [];
    
    while (similarListings.length<3){
        const randomNum = Math.floor(Math.random()*otherListings.length);
        similarListings.push(otherListings.splice(randomNum,1));
    }

    // remove empty listings if there are < 3 games on the same platform
    similarListings = similarListings.filter(listing => listing.length != 0);

    res.json({listingToDisplay,similarListings});
}

exports.getListing = getListing;
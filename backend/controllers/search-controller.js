const DUMMYLISTINGS = require("../data/dummyData");

function searchAlgorithmn(searchphrase, listing) {
  
    let wordsInListings = listing.title + " " + listing.platform;
    // currently only searches for words in the title and platform property
    wordsInListings = wordsInListings.toLowerCase().split(" ");
    
    if (wordsInListings.includes(searchphrase)){
      return listing;
    }
    else return null;
}

const returnSearches = (req,res,next) => {
    const searchphrase = req.params.searchphrase;
    const allListings = DUMMYLISTINGS;

    let matchedListings = allListings.map(listing=>searchAlgorithmn(searchphrase,listing));
    matchedListings = matchedListings.filter(listing => listing !== null );
    
    res.json({matchedListings});
}

exports.returnSearches = returnSearches;
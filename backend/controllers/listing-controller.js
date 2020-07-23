const allListings = require("../data/dummyData");

// To be eventually added
// const newListing
// const updateListing
// const deleteLising

const getListing = (req, res, next) => {
  const listingID = req.params.listingID;

  const listingToDisplay = allListings.find(
    (listing) => listing.listingId.toString() === listingID
  );
  if (listingToDisplay) {
    const selectedPlatform = listingToDisplay.platform;
    // find all other games on the same platform
    const otherListings = allListings.filter(
      (listing) =>
        listing.listingId.toString() !== listingID &&
        listing.platform === selectedPlatform
    );
    // similarListings = 3 random listings on the same platform
    let similarListings = [];

    while (similarListings.length < 3 && otherListings.length > 0) {
      const randomNum = Math.floor(Math.random() * otherListings.length);
      const [randomListing] = otherListings.splice(randomNum, 1);
      similarListings.push(randomListing);
    }

    // remove empty listings if there are < 3 games on the same platform
    similarListings = similarListings.filter((listing) => listing.length != 0);
    res.json({ listingToDisplay, similarListings });
  } else res.json({ listingToDisplay });
};

const addListing = (req, res, next) => {
  const {} = req.body;
  res.status(201).json();
};

const getMostRecentListings = (req, res, next) => {
  let elementCount = 5;
  let mostRecentListings = allListings.slice(0, elementCount);

  // sorts the first n listing dates in ascending order
  mostRecentListings.sort((a, b) => {
    if (a.dateListed > b.dateListed) {
      return 1;
    } else if (a.dateListed < b.dateListed) {
      return -1;
    } else return 0;
  });

  for (listing of allListings.slice(elementCount)) {
    for (i = 0; i < mostRecentListings.length; i++) {
      // if incoming listing is the newest listing in the mostRecentListings array
      if (i === mostRecentListings.length - 1) {
        let prevListing = listing;
        for (j = i; j >= 0; j--) {
          [mostRecentListings[j], prevListing] = [
            prevListing,
            mostRecentListings[j],
          ];
        }
      } else if (listing.dateListed < mostRecentListings[i].dateListed) {
        if (i > 0) {
          let prevListing = listing;
          for (j = i - 1; j >= 0; j--) {
            [mostRecentListings[j], prevListing] = [
              prevListing,
              mostRecentListings[j],
            ];
          }
          break;
        }
      }
    }
  }

  res.json({ mostRecentListings });
};

exports.getListing = getListing;
exports.getMostRecentListings = getMostRecentListings;

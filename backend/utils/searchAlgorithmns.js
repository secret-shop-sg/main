// different methods of searching/filtering
function searchGeneral(searchphrase, listing) {
  let wordsInListings = listing.title + " " + listing.platform;
  // currently only searches for words in the title and platform property. Eventually platform should be a filter
  wordsInListings = wordsInListings.replace(/[^a-zA-Z0-9 ]/g, "");
  wordsInListings = wordsInListings.toLowerCase().split(" ");

  for (const keyword of searchphrase) {
    if (wordsInListings.includes(keyword)) {
      return listing;
    }
  }
  return null;
}

// used for filters
function searchFilters(listing, category, values) {
  if (category === "platform") {
    if (values.includes(listing.platform.replace(" ", "-"))) {
      return listing;
    }
  }
  if (category === "listingtype") {
    let isTrading = false;
    let isRenting = false;
    let isSelling = false;

    for (value of values) {
      switch (value) {
        case "Trade":
          isTrading = true;
          break;
        case "Rent":
          isRenting = true;
          break;
        case "Buy":
          isSelling = true;
          break;
      }
    }

    if (
      (isTrading && listing.isTrading) ||
      (isRenting && listing.isRenting) ||
      (isSelling && listing.isSelling)
    ) {
      return listing;
    }
  }
}

exports.searchGeneral = searchGeneral;
exports.searchFilters = searchFilters;

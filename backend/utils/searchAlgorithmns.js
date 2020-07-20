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

function searchCategory(listing, category, value) {
  if (category == "platform") {
    if (listing.platform.replace(" ", "-") === value) {
      return listing;
    }
  } else if (category == "title") {
    if (listing.title.replace(" ", "-") === value) {
      return listing;
    }
  }
}

exports.searchGeneral = searchGeneral;
exports.searchCategory = searchCategory;

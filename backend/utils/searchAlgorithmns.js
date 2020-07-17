// different methods of searching/filtering
function searchGeneral(searchphrase, listing) {
  
    let wordsInListings = listing.title + " " + listing.platform;
    // currently only searches for words in the title and platform property
    wordsInListings = wordsInListings.toLowerCase().split(" ");
  
    for (const keyword of searchphrase){
      if (wordsInListings.includes(keyword)){
        return listing;
      }
    }
    return null;
  }
  
function searchCategory(listing, category, value){
if (category == "platform"){
    if (listing.platform.toLowerCase().replace(" ","-") === value){
    return listing;
    }

}
else if (category == "title"){
    if (listing.title.toLowerCase().replace(" ","-") === value){
    return listing;
    }
}
}

exports.searchGeneral = searchGeneral;
exports.searchCategory = searchCategory;
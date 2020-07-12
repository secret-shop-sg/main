import React from "react";
import Header from "../components/Main/Header";
import { useSelector } from "react-redux";
import SearchListing from "../components/SearchResults/SearchListing";
import Error404 from "./Error404";

class searchAlgorithmns {
  constructor(searchphrase, listing) {
    this.searchphrase = searchphrase.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    this.listing = listing;
  }
}

const SearchResult = (props) => {
  const allListings = useSelector((state) => state.listings.listings);

  let query = props.location.search;
  let listingsToDisplay = [];

  if (query.slice(0, 8) == "?phrase=") {
    let searchphrase = query.substring(8);
    // searchphrase = what the user typed

    function searchAlgorithmn(listing) {
      if (
        searchphrase.toLowerCase() == listing.title.toLowerCase() ||
        searchphrase.toLowerCase() == listing.platform.toLowerCase()
      ) {
        listingsToDisplay.push(listing);
      }
    }

    allListings.map((listing) => searchAlgorithmn(listing));

    return (
      <div style={{ width: "100%" }}>
        <Header />
        <div className="body">
          <p> Showing search results for "{searchphrase}"</p>
          {listingsToDisplay.length == 0 ? (
            <p>No games found</p>
          ) : (
            listingsToDisplay.map((listing) => (
              <SearchListing key={listing.listingId} listing={listing} />
            ))
          )}
        </div>
      </div>
    );
  } else return <Error404 />;
};

export default SearchResult;

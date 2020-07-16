import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Main/Header";
import SearchListing from "../components/SearchResults/SearchListing";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import Headernew from "../components/Main/headernew";
import BACKENDADDRESS from "../constants/BackendAddress";

const SearchResult = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchedListings, setMatchedListings] = useState();
  let query = props.location.search;

  let searchphrase = query.substring(9);
  // searchphrase = what the user typed
  searchphrase = searchphrase.toLowerCase().replace(/(<([^>]+)>)/gi, "");
  // TODO: configure for multiple words

  useEffect(() => {
    setIsLoading(true);

    // call express api to get search results
    const getListings = async () => {
      try {
        const response = await fetch(
          `${BACKENDADDRESS}/api/search/keyword/${searchphrase}`
        );
        const responseData = await response.json();
        // returns an array of listings
        setMatchedListings(responseData.matchedListings);
      } catch (err) {
        // Todo: Add Error Handling if API call fails
        console.log(err);
      }
      setIsLoading(false);
    };
    getListings();
  }, [searchphrase]);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      {/* components in the div below only loads after data has been retrieved from API */}
      {!isLoading && matchedListings && (
        <div className="searchResultsPageBody">
          {matchedListings.length === 0 ? (
            // No matches for what the user found
            <NoMatches searchphrase={searchphrase} />
          ) : (
            matchedListings.map((listing) => (
              <Link
                to={{
                  pathname: `/listing/${listing.title}`,
                  search: `${listing.listingId}`,
                }}
                key={listing.listingId}
              >
                {/*url = /listing/?(title of listing) */}
                <SearchListing listing={listing} />
              </Link>
            ))
          )}
          {/* Todo: Add this section when backend is included (Alot easier with backend)
          <hr />
          <p style={{margin:"20px"}}>Check out some of our other listings on the same platform</p>
          Call some API here
          */}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Main/Header";
import SearchListing from "../components/SearchResults/SearchListing";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import { useAPI } from "../utils/useAPI";

const SearchResult = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [matchedListings, setMatchedListings] = useState();
  let query = props.location.search;

  // searchphrase = what the user typed
  const searchphrase = query.substring(9);
  const filteredphrase = searchphrase.toLowerCase().replace(/(<([^>]+)>)/ig, "").replace(" ", "-");

  // fix multiple api requests whenever searchphrase changes
  // TODO: configure for multiple words

  useEffect(() => {

    // call express api to get search results 
    const getListings = async () => {
      const responseData = await sendRequest(`/api/search/keyword/${filteredphrase}`);
      setMatchedListings(responseData.matchedListings);
    };
    getListings();

  }, [filteredphrase]);

  return (
    <div style={{ width: "100%" }} >
      <Header />
      {/* components in the div below only loads after data has been retrieved from API */}
      {!isLoading && matchedListings &&
        <div className="searchResultsPageBody">
          {(matchedListings.length === 0) ?
            // No matches for what the user found
            <NoMatches searchphrase={searchphrase} />
            : matchedListings.map(listing => (
              <Link to={{ pathname: `/listing/${listing.title}`, search: `${listing.listingId}` }}
                key={listing.listingId}>
                { /*url = /listing/?(title of listing) */}
                <SearchListing listing={listing} />
              </Link>
            ))
          }
          {/* Todo: Add this section when backend is included (Alot easier with backend)
          <hr />
          <p style={{margin:"20px"}}>Check out some of our other listings on the same platform</p>
          Call some API here
          */}
        </div>
      }
    </div>
  );
};

export default SearchResult;

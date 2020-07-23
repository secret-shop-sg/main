import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Main/Header";
import SearchListing from "../components/SearchResults/SearchListing";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import { useAPI } from "../utils/useAPI";
import ListingsFilter from "../components/SearchResults/ListingsFilter";

const SearchResult = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [matchedListings, setMatchedListings] = useState();
  let query = props.location.search.slice(1);

  // function to calculate API endpoint based on URL
  const constructAPIpath = (query) => {
    let apiPath = "";
    // returns -1 when no more "="
    while (query.indexOf("=") !== -1) {
      const filterType = query.substring(0, query.indexOf("="));
      apiPath = apiPath + filterType + "=";
      query = query.substring(query.indexOf("=") + 1);

      if (query.indexOf("&") !== -1) {
        const filterValue = query.substring(0, query.indexOf("&"));
        apiPath = apiPath + filterValue + "&";
        query = query.substring(query.indexOf("&") + 1);
      } else {
        apiPath = apiPath + query;
        break;
      }
    }
    return apiPath;
  };

  const apiPath = constructAPIpath(query);

  useEffect(() => {
    // call express api to get search results
    const getListings = async () => {
      const responseData = await sendRequest(`/api/search?${apiPath}`);
      setMatchedListings(responseData.matchedListings);
    };
    getListings();
  }, [apiPath, sendRequest]);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <ListingsFilter filterLabel="platform" />
      <ListingsFilter filterLabel="listingtype" />
      {/* components in the div below only loads after data has been retrieved from API */}
      {!isLoading && matchedListings && (
        <div className="searchResultsPageBody">
          {matchedListings.length === 0 ? (
            // No matches for what the user found
            <NoMatches query={query} />
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

export default SearchResult
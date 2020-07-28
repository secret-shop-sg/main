import React, { useEffect, useState } from "react";
import Header from "../components/Shared/Header";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import { useAPI } from "../utils/useAPI";
import ListingsFilter from "../components/SearchResults/ListingsFilter";
import HomeListing from "../components/Home/HomeListing";

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
      if (responseData) {
        setMatchedListings(responseData.matchedListings);
      }
    };
    getListings();
  }, [apiPath, sendRequest]);

  return (
    <div className="screen">
      <Header />
      <div>
        <ListingsFilter filterLabel="platform" />
        <ListingsFilter filterLabel="listingtype" />
      </div>
      <div className="display">
        {/* components in the div below only loads after data has been retrieved from API */}
        {!isLoading && matchedListings && matchedListings.length === 0 && (
          <NoMatches query={query} />
        )}
        {!isLoading && matchedListings && matchedListings.length > 0 && (
          <div className="results-display">
            {matchedListings.map((listing) => (
              <HomeListing
                title={listing.title}
                description={listing.description}
                image={listing.image}
                id={listing.listingId}
                platform={listing.platform}
                isTrading={listing.isTrading}
                isRenting={listing.isRenting}
                isSelling={listing.isSelling}
              />
            ))}
          </div>
        )}
        {/* Todo: Add this section when backend is included (Alot easier with backend)
          <hr />
          <p style={{margin:"20px"}}>Check out some of our other listings on the same platform</p>
          Call some API here
          */}
      </div>
    </div>
  );
};

export default SearchResult;

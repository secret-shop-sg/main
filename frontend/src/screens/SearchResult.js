import React, { useEffect, useState } from "react";
import Header from "../components/Shared/Header";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import { useAPI } from "../utils/useAPI";
import ListingsFilter from "../components/SearchResults/ListingsFilter";
import HomeListing from "../components/Home/HomeListing";
import { useHistory } from "react-router-dom";

const SearchResult = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [matchedListings, setMatchedListings] = useState();
  const [pageData, setPageData] = useState();
  const history = useHistory();
  let query = props.location.search.slice(1);
  useEffect(() => {
    // call express api to get search results
    const getListings = async () => {
      const responseData = await sendRequest(`/api/search?${query}`);
      if (responseData) {
        setMatchedListings(responseData.queryData.matchedData);
        setPageData(responseData.queryData.pageData);
      }
    };
    getListings();
  }, [query, sendRequest]);

  const pageButtonHandler = (event) => {
    let value;

    if (event.target.id === "next") {
      value = 1;
    } else if (event.target.id === "previous") {
      value = -1;
    }

    let newURL = props.location.pathname + "?";

    const startingIndex = query.indexOf(`page=`);
    if (startingIndex === -1) {
      let symbol = "";
      if (query) {
        symbol = "&";
      }
      newURL = newURL + query + symbol + `page=${pageData.currentPage + value}`;
    } else {
      newURL =
        newURL +
        query.substring(0, startingIndex + 5) +
        (pageData.currentPage + value);

      const lengthOfNumber = query.substring(startingIndex + 5).indexOf("&");
      if (lengthOfNumber !== -1) {
        newURL = newURL + query.substring(startingIndex + 5 + lengthOfNumber);
      }
    }

    history.push(newURL);
  };

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
          <div>
            <div>
              {matchedListings.map((listing) => (
                <HomeListing
                  title={listing.hasItem.title}
                  description={listing.description}
                  image={listing.hasItem.imageURL}
                  id={listing._id}
                  platform={listing.hasItem.platform}
                  isTrading={listing.wantsItem.length > 0}
                  isRenting={listing.rentalPrice}
                  isSelling={listing.sellingPrice}
                />
              ))}
            </div>
            {pageData && pageData.previousPage && (
              <div>
                <input
                  type="button"
                  value="Previous page"
                  id="previous"
                  onClick={pageButtonHandler}
                />
              </div>
            )}
            {pageData && pageData.nextPage && (
              <div>
                <input
                  type="button"
                  value="Next page"
                  id="next"
                  onClick={pageButtonHandler}
                />
              </div>
            )}
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

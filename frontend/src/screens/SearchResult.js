import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import NoMatches from "../components/SearchResults/NoMatches";
import "./styles/SearchResult.css";
import { useAPI } from "../utils/useAPI";
import SearchFilters from "../components/SearchResults/SearchFilters";
import ListingSummary from "../components/ListingSummary/ListingSummary";
import { useHistory } from "react-router-dom";
import changePageHandler from "../utils/changePageHandler";

const SearchResult = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [matchedListings, setMatchedListings] = useState();
  const [pageData, setPageData] = useState();
  const history = useHistory();
  const query = props.location.search;
  useEffect(() => {
    // call express api to get search results
    const getListings = async () => {
      const responseData = await sendRequest(`/api/search${query}`);
      if (responseData) {
        setMatchedListings(responseData.queryData.matchedData);
        setPageData(responseData.queryData.pageData);
      }
    };
    getListings();
  }, [query, sendRequest]);

  const pageButtonHandler = (event) => {
    const newURL = changePageHandler(
      query,
      pageData.currentPage,
      event.target.id
    );
    history.push(props.location.pathname + newURL);
  };

  return (
    <div className="search-results-screen">
      <Header />
      <SearchFilters />
      {!isLoading && matchedListings && matchedListings.length === 0 && (
        <NoMatches query={query.substring(1)} />
      )}
      {!isLoading && matchedListings && matchedListings.length > 0 && (
        <div className="search-results-display">
          {matchedListings.map((listing) => {
            console.log(listing);
            return (
              <ListingSummary
                itemData={listing.hasItem}
                listingId={listing._id}
                sellingPrice={listing.sellingPrice}
                owner={listing.owner}
                description={listing.description}
                listingDate={listing.dateListed}
              />
            );
          })}
        </div>
      )}
      {pageData && pageData.previousPage && (
        <div>
          <input
            type="button"
            value="Previous page"
            id="previousPage"
            onClick={pageButtonHandler}
          />
        </div>
      )}
      {pageData && pageData.nextPage && (
        <div>
          <input
            type="button"
            value="Next page"
            id="nextPage"
            onClick={pageButtonHandler}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;

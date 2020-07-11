import React from "react";
import Header from "../components/Main/Header";
import dummyListings from '../data/dummyData';
import SearchListing from '../components/SearchResults/SearchListing'
import Error404 from './Error404';

const SearchResult = (props) => {
  let query = props.location.search;
  let listingsToDisplay = [];

  if (query.slice(0,8)=="?phrase="){
    let searchphrase = query.substring(8)
    // searchphrase = what the user typed

    dummyListings.map(listing => {
      if (searchphrase == listing.platform || searchphrase == listing.title){
        listingsToDisplay.push(listing);
      }
    })

    return (
      <div style= {{width:"100%"}} >
        <Header />
        <div className = "body">
          <h1>Search page</h1>
          <p> Showing search results for "{searchphrase}"</p>
          {(listingsToDisplay.length==0)?
          <p>No games found</p>
          :listingsToDisplay.map(listing => <SearchListing key= {listing.listingId} listing={listing} />)}
        </div>
      </div>
    );
  } 

  else return <Error404 />
  
};

export default SearchResult;

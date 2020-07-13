import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

import Header from "../components/Main/Header";
import SearchListing from '../components/SearchResults/SearchListing';
import NoMatches from "../components/SearchResults/NoMatches";
import Error404 from './Error404';
import "./SearchResult.css"

function searchAlgorithmn(searchphrase, listing) {

  searchphrase = searchphrase.toLowerCase().replace(/(<([^>]+)>)/ig,"")

  let wordsInListings = listing.title + " " + listing.platform;
  // currently only searches for words in the title and platform property
  wordsInListings = wordsInListings.toLowerCase().split(" ");

  if (wordsInListings.includes(searchphrase)){
    return listing;
  }
  else return null;
}

const SearchResult = (props) => {

  const allListings = useSelector((state) => state.listings.listings);
  let query = props.location.search;
  let listingsToDisplay = [];

  if (query.slice(0,8)==="?phrase="){
    let searchphrase = query.substring(8);
    // searchphrase = what the user typed

    listingsToDisplay = allListings.map(listing => searchAlgorithmn(searchphrase,listing));
    listingsToDisplay = listingsToDisplay.filter(listingToDisplay => listingToDisplay !== null );

    return (
      <div style= {{width:"100%"}} >
        <Header />
        <div className = "pageBody">
          {(listingsToDisplay.length===0)?
          <NoMatches searchphrase={searchphrase}/>
          :listingsToDisplay.map(listing => 
            <Link to= {{
              pathname:"/listing",
              search:`id=${listing.title}`,}}>
                { /*url = /listing/id?=(title of listing) */}
                <SearchListing key= {listing.listingId} listing={listing} />
            </Link>
          )}
        </div>
      </div>
    );

  } 

  else return <Error404 />;
  
};

export default SearchResult;

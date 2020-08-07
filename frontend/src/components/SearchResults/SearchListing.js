import React from "react";
import "./SearchListing.css";

const SearchListing = (props) => {
  const listing = props.listing;

  return (
    <div className="listingTile">
      <h2>{listing.title}</h2>
      <img src={listing.image} alt="listing" className="listingImage" />
      <p>Platform supported: {listing.platform}</p>
      <p>Listed on: {listing.dateListed}</p>
    </div>
  );
};

export default SearchListing;

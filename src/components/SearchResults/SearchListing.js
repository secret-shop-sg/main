import React from 'react';
import "./SearchListing.css";

const SearchListing = props => {
    return(
        <div className= "listingTile">
            <h2>{props.listing.title}</h2>
            <img src ={props.listing.image} className= "listingImage" />
            <p>Listed on: {props.listing.dateListed}</p>
        </div>
    )
}

export default SearchListing
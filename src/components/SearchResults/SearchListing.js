import React from 'react'

const SearchListing = props => {
    return(
        <div>
            <h2>{props.listing.title}</h2>
            <p>{props.listing.owner}</p>
            <p>{props.listing.platform}</p>
        </div>
    )
}

export default SearchListing
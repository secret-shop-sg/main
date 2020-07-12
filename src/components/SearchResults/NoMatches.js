import React from "react";

const NoMatches = props =>{
    return (
        <div>
            <p>Your search "{props.searchphrase}" did not match any of our listings :(</p>
            <p>Try another search with more general keywords!</p>
        </div>
    )
}

export default NoMatches;
import React from "react";

const NoMatches = (props) => {
  let query = props.query;
  const noMatchedPhrase = (
    <div>
      <p>
        Your search "{query.substring(7)}" did not match any of our listings :(
      </p>
      <p>Try again with more general keywords!</p>
    </div>
  );

  const noMatchedFilters = (
    <div>
      <p>We do not currently have any listings that fulfil these filters :(</p>
    </div>
  );

  if (query.indexOf("&") === -1 && query.substring(0, 7) === "phrase=") {
    return noMatchedPhrase;
  } else return noMatchedFilters;
};

export default NoMatches;

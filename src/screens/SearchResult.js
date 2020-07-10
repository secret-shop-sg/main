import React from "react";
import Header from "../components/Main/Header";
import dummyListings from '../data/dummyData';

const SearchResult = (props) => {
  // takes in searchPhrase (what the user searched)
  return (
    <div style= {{width:"100%"}} >
      <Header />
      <div className = "body">
        <h1>Search page</h1>
        <p> Showing search results from </p>
      </div>
    </div>
  );
};

export default SearchResult;

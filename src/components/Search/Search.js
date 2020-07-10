import React, { useState } from 'react';
import Header from "../Main/Header";
import dummyListings from '../../data/dummyData';
import './Search.css'

const Search = () => {
    // takes in searchPhrase (what the user searched)
    return(
        <div className="body">
            <Header />
            <div>
                <h1>Search page</h1>
                <p> Showing search results from </p>
            </div>
        </div>
    )
}

export default Search
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../utils/useAPI";

import Header from "../components/Main/Header";
import Platforms from "../components/Home/Platforms";
import "./styles/Main.css";
import HomeListing from "../components/Home/HomeListing";

const Main = (props) => {
  const [sendRequest, isLoading] = useAPI();
  const [listings, setListings] = useState([]);

  // get listings to display on front page
  useEffect(() => {
    // async function to get listings
    const getListings = async () => {
      const listingsFromServer = await sendRequest(
        `/api/search/keyword/switch`
      );
      setListings(listingsFromServer.matchedListings);
    };

    // call async function
    getListings();
  }, []);

  // function to display listings
  const displayListings = useCallback(() => {
    if (isLoading) {
      // loading screen
      return <div>Loading</div>;
    } else {
      return listings.map((listing) => (
        <div>
          <Link
            to={{
              pathname: `/listing/${listing.title}`,
              search: `${listing.listingId}`,
            }}
            key={listing.listingId}
          >
            <HomeListing
              title={listing.title}
              description={listing.description}
              image={listing.image}
            />
          </Link>
        </div>
      ));
    }
  }, [listings]);

  return (
    <div className="mainScreen">
      <Header />
      <div className="display">
        <Platforms />
        <div className="listings">{displayListings()}</div>
      </div>
    </div>
  );
};

export default Main;

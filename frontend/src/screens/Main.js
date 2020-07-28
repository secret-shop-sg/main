import React, { useState, useEffect, useCallback } from "react";

import { useAPI } from "../utils/useAPI";

import Header from "../components/Shared/Header";
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
      const listingsFromServer = await sendRequest(`/api/listing/recent`);
      if (listingsFromServer) {
        setListings(listingsFromServer.mostRecentListings);
      }
    };

    // call async function
    getListings();
  }, [sendRequest]);

  // function to display listings
  const displayListings = useCallback(() => {
    if (isLoading) {
      // loading screen
      return <div>Loading</div>;
    } else {
      return listings.map((listing) => (
        <HomeListing
          title={listing.title}
          description={listing.description}
          image={listing.image}
          id={listing.listingId}
          platform={listing.platform}
          isTrading={listing.isTrading}
          isRenting={listing.isRenting}
          isSelling={listing.isSelling}
        />
      ));
    }
  }, [listings, isLoading]);

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

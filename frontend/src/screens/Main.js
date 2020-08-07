import React, { useState, useEffect, useCallback } from "react";

import { useAPI } from "../utils/useAPI";

import Header from "../components/Shared/Header";
import Platforms from "../components/Home/Platforms";
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
      <div style={styles.display}>
        <Platforms />
        <div style={styles.listings}>{displayListings()}</div>
      </div>
    </div>
  );
};

// styles
const styles = {
  display: {
    width: "90%",
    marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listings: {
    marginTop: "5rem",
    width: "100%",
  },
};

export default Main;

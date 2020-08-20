import React, { useState, useEffect, useCallback } from "react";

import { useAPI } from "../utils/useAPI";

import Header from "../components/Header/Header";
import Platforms from "../components/Home/Platforms";
import ListingSummary from "../components/ListingSummary/ListingSummary";
import { Jumbotron, Container } from "react-bootstrap";

const Main = () => {
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
        <ListingSummary
          itemData={listing.hasItem}
          listingId={listing._id}
          sellingPrice={listing.sellingPrice}
          owner={listing.owner}
          description={listing.description}
          listingDate={listing.dateListed}
          profilePic={listing.ownerID.profilePicURL}
        />
      ));
    }
  }, [listings, isLoading]);

  return (
    <div className="mainScreen">
      <Header />
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to the Secret Shop</h1>
          <p>
            The one-stop destination for all your second-hand video game needs.
          </p>
        </Container>
      </Jumbotron>
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
    width: "100%",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listings: {
    width: "100%",
    padding: "1rem",
  },
};

export default Main;

import React, { useState, useEffect, useCallback } from "react";

import { useAPI } from "../utils/useAPI";

import Header from "../components/Header/Header";
import Platforms from "../components/Home/Platforms";
import ListingSummary from "../components/ListingSummary/ListingSummary";
import {
  Jumbotron,
  Container,
  Dropdown,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import "./styles/Main.css";

const Main = () => {
  const [sendRequest, isLoading] = useAPI();
  const [listings, setListings] = useState([]);
  const [sortKey, setSortKey] = useState("");

  // function to set label of sort by dropdown
  const sortLabel = () => {
    switch (sortKey) {
      case "1":
        return "Relevance";
      case "2":
        return "Popularity";
      case "3":
        return "Recent";
      default:
        return "Sort by";
    }
  };

  // function for setting sort by after dropdown is selected
  const onSortSelect = (key, _) => {
    setSortKey(key);
  };

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
        <hr />
        <div className="main-page-listings-label">
          <div>Browse through some of our listings</div>
          <Dropdown as={ButtonGroup} alignRight>
            <Button variant="outline-dark">{sortLabel()}</Button>
            <Dropdown.Toggle split variant="outline-dark" />
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onSelect={onSortSelect}>
                Relevance
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onSelect={onSortSelect}>
                Popularity
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onSelect={onSortSelect}>
                Recent
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="main-page-listings">{displayListings()}</div>
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
};

export default Main;

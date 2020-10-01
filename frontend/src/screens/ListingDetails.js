import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

import "./styles/ListingDetails.css";
import { BsChatFill, BsHeartFill } from "react-icons/bs";
import { useAPI } from "../utils/useAPI";
import ListingDoesNotExist from "../components/ListingDetails/ListingDoesNotExist";
import { BACKEND_ADDRESS } from "../constants/Details";
import LikeButton from "../components/ListingDetails/LikeButton";
import SimilarListingDisplay from "../components/ListingDetails/SimilarListingDisplay";
import { Button } from "react-bootstrap";

const ListingDetails = (props) => {
  // todo: Check listing title
  const listingToSearch = props.location.search.substring(1);
  const [sendRequest, isLoading] = useAPI();
  const [liked, setliked] = useState(false);
  // listingToDisplay = Main listing
  const [listingToDisplay, setListingToDisplay] = useState();
  // similarListings = An array of max 3 listings on the same platform as main listing
  const [similarListings, setSimilarListings] = useState();

  useEffect(() => {
    const getListing = async () => {
      const responseData = await sendRequest(
        `/api/listing/id/${listingToSearch}`,
        undefined,
        undefined,
        true
      );
      if (responseData) {
        setListingToDisplay(responseData.listingToDisplay);
        setSimilarListings(responseData.similarListings);
      }
    };
    getListing();
  }, [listingToSearch]);

  return (
    <div>
      <Header />
      {!isLoading && !listingToDisplay && <ListingDoesNotExist />}
      {!isLoading && listingToDisplay && similarListings && (
        <div className="listingwrapper">
          <div className="TitlePlatformImage">
            <h2>{listingToDisplay.hasItem.title}</h2>
            <h5>For the {listingToDisplay.hasItem.platform}</h5>
            <img
              className="listingimage"
              src={BACKEND_ADDRESS + listingToDisplay.hasItem.imageURL}
              alt={listingToDisplay.hasItem.title}
            />
          </div>
          <div className="listingdetails">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img
                  className="userpicture"
                  alt="User"
                  src={BACKEND_ADDRESS + listingToDisplay.ownerProfilePic}
                />
                <Link to={`/user/${listingToDisplay.owner}`}>
                  {listingToDisplay.owner}
                </Link>
                <div>|Rating</div>
              </div>
              <div className="d-flex flex-row align-items-center">
                {listingToDisplay.userIsOwner && (
                  <Button variant="outline-secondary">Edit</Button>
                )}
                <LikeButton
                  liked={listingToDisplay && listingToDisplay.wasBookmarked}
                  id={listingToDisplay._id}
                />
                <button className="btn-cop">
                  <BsChatFill />
                  <span> </span>Make an Offer!
                </button>
              </div>
            </div>
            <hr></hr>
            <p className="datelisted">
              Listed on {listingToDisplay.dateListed}
            </p>
            <div>
              <p>{listingToDisplay.description}</p>
            </div>
          </div>
          <div className="similarlistings">
            <h2>Similar Listings</h2>
            <hr></hr>
            {similarListings.length === 0
              ? null
              : similarListings.map((listing) => (
                  <SimilarListingDisplay
                    listingData={listing}
                    key={listing._id}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;

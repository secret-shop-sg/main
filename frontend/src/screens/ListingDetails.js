import React, { useState, useEffect } from "react";
import Header from "../components/Main/Header";
import BACKENDADDRESS from "../constants/BackendAddress";
import "../constants/styles/Bootstrap.css";
import "./styles/ListingDetails.css";
import Headernew from "../components/Main/headernew";
import { BsChatFill, BsHeartFill } from "react-icons/bs";

const ListingDetails = (props) => {
  const listingID = props.location.search.substring(1);
  const [isLoading, setIsLoading] = useState(false);
  const [listingToDisplay, setListingToDisplay] = useState();

  useEffect(() => {
    setIsLoading(true);

    const getListing = async () => {
      try {
        const response = await fetch(
          `${BACKENDADDRESS}/api/listing/${listingID}`
        );
        const responseData = await response.json();
        setListingToDisplay(responseData.listingToDisplay);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getListing();
  }, [listingID]);

  const [liked, setliked] = useState(false);

  function likehandler() {
    setliked(true);
  }
  function likedhandler() {
    setliked(false);
  }
  return (
    <div>
      <Header />
      {!isLoading && listingToDisplay && (
        <div>
          <div id="headerdiv">
            <h2 id="listingtitle">{listingToDisplay.title}</h2>
            <h3 id="platform">For the {listingToDisplay.platform}</h3>
          </div>
          <div className="container col-3 float-left text-center">
            <img id="listingimage" src={listingToDisplay.image} />
          </div>
          <div className="container col-6 details">
            <p>
              <span className="owner">Owned by: {listingToDisplay.owner}</span>
              {!liked ? (
                <span>
                  <button onClick={likehandler} className="btn-like">
                    <BsHeartFill />
                    <span> </span>Like!
                  </button>
                </span>
              ) : (
                <span>
                  <button onClick={likedhandler} className="btn-liked">
                    <BsHeartFill />
                    <span> </span>Like!
                  </button>
                </span>
              )}
              <span>
                <button className="btn-cop">
                  <BsChatFill />
                  <span> </span>Make an Offer!
                </button>
              </span>
            </p>
            <hr></hr>
            <p>Listed on: {listingToDisplay.dateListed}</p>
            <p>{listingToDisplay.description}</p>
          </div>

          <div className="container col-3 float-right">
            <h2>Other Listings</h2>
            <hr></hr>
          </div>
          <div id="reccomendationimg col-3 float-right">
            <div className="container col-3 float-left recommendationimgextend">
              <img
                id="img1"
                src="https://images.nintendolife.com/73b5ee31cad64/super-smash-bros-ultimate-cover.cover_large.jpg"
              />
            </div>
            <div className="recommendationtitle">
              <h4>Super Smash Bros</h4>
              <p>
                Owned by <strong>Joshua</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  console.log(props);

  return <div>{props}</div>;
};

export default ListingDetails;

import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Header from "../components/Main/Header";
import "../constants/styles/Bootstrap.css";
import "./styles/ListingDetails.css";
import Headernew from "../components/Main/headernew";
import { BsChatFill, BsHeartFill } from "react-icons/bs";
import {useAPI} from "../utils/useAPI";

const ListingDetails = (props) => {
  const listingID = props.location.search.substring(1);
  const [sendRequest, isLoading] = useAPI();
  
  // listingToDisplay = Main listing
  const [listingToDisplay, setListingToDisplay] = useState();
  // similarListings = An array of max 3 listings on the same platform as main listing
  const [similarListings, setSimilarListings] = useState();
  
  useEffect(()=>{

    const getListing = async () => {
      const responseData = await sendRequest(`/api/listing/${listingID}`)
      setListingToDisplay(responseData.listingToDisplay);
      setSimilarListings(responseData.similarListings);
    };

    getListing();
  }, [listingID]);
  
  const [liked, setliked] = useState(false);

  function likehandler() {
    setliked(!liked)
  }
  
  return (
    <div>
      <Header />
      {!isLoading && listingToDisplay && similarListings && (
        <div>
          <div id="headerdiv">
            <h2 id="listingtitle">{listingToDisplay.title}</h2>
            <h3 id="platform">For the {listingToDisplay.platform}</h3>
          </div>
          <div className="container col-3 float-left text-center">
            <img id="listingimage" src={listingToDisplay.image} />
          </div>
          <div className="container col-6 details">
            <p className="detailsi">
              <span className="owner">Owned by: {listingToDisplay.owner}</span>
              <span>
                <button onClick={likehandler} className={liked?"btn-liked":"btn-like"}>
                  <BsHeartFill />
                  <span> </span>Like!
                </button>
              </span>
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
            {(similarListings.length === 0 ) ? null : 
              similarListings.map(listing =>(
                <div id="recommendationimg" key={listing.listingId}>
                  <div className="container col-3 float-left recommendationimgextend">
                    <Link to= {{ pathname:`/listing/${listing.title}`, search:`${listing.listingId}`}} >
                    <img
                      className="imgsuggested"
                      src={listing.image}
                    />
                    </Link>
                  </div>
                  <div>
                    <Link to= {{ pathname:`/listing/${listing.title}`, search:`${listing.listingId}`}} >
                    <h4 className="recommendationtitle">{listing.title}</h4>
                    </Link>
                    <p>
                      Owned by <strong id="owner">{listing.owner}</strong>
                    </p>
                  </div>
                </div>
                )
              )
          }
        </div>
      )}
    </div>
  );
};

export default ListingDetails;

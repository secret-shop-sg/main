import React, { useState } from "react";
import Header from "../components/Main/Header";
import "./Bootstrap.css";
import "./ListingDetails.css";

import{FaHeart} from "react-icons/fa";
import{BsChatFill,BsHeartFill} from "react-icons/bs";
const ListingDetails = props => {
  // takes in listing as a prop, equivalent to a element in the DUMMYLISTINGS array
  const listing = props.location.listing;
  const [liked, setliked] = useState(false);

  function likehandler(){
    setliked(true);
  }
  function likedhandler(){
    setliked(false);
  }
  return (
    <div>
      <Header />
      <div id="headerdiv">
      <h2 id="listingtitle">{props.location.listing.title}</h2>
      <h3 id="platform">For the {props.location.listing.platform}</h3>
      </div>
      <div className="container col-3 float-left text-center">
      <img id="listingimage" src={props.location.listing.image} />
      </div>
      <div className="container col-6 details">
        <p><span className="owner">Owned by: {props.location.listing.owner}</span>
        {!liked ? <span><button onClick={likehandler} className="btn-like"><BsHeartFill /><span> </span>Like!</button></span> : 
        <span><button onClick={likedhandler} className="btn-liked"><BsHeartFill /><span> </span>Like!</button></span>}
        <span><button className="btn-cop"><BsChatFill /><span> </span>Make an Offer!</button></span></p>
        <hr></hr>
        <p>Listed on: {props.location.listing.dateListed}</p>
        <p>{props.location.listing.description}</p>
      </div>
   
    <div className="container col-3 float-right">
      <h2>Other Listings</h2>
      <hr></hr>
    </div>
    <div id="reccomendationimg col-3 float-right">
    <div className="container col-3 float-left recommendationimgextend">
      <img id="img1" src="https://images.nintendolife.com/73b5ee31cad64/super-smash-bros-ultimate-cover.cover_large.jpg"/>
    </div>
    <div className="recommendationtitle">
      <h4>Super Smash Bros</h4>
      <p>Owned by <strong>Joshua</strong></p>
    </div>
    </div>
    </div>
  );
};

export default ListingDetails;
import React, { useState } from "react";
import Header from "../components/Main/Header";
import "./Bootstrap.css";
import "./ListingDetails.css";
import Headernew from "../components/Main/headernew"
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
      <h1 id="listingtitle">{props.location.listing.title}</h1>
      <h3 id="platform">For the {props.location.listing.platform}</h3>
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
      <h2>Other Listings you might like</h2>
    </div>
    <div id="recommendations" className="container col-3 float-right">
      yo
    </div>
    </div>
  );
};

export default ListingDetails;
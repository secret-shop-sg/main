import React from "react";
import Header from "../components/Main/Header";
import "./Bootstrap.css";
import "./ListingDetails.css";
const ListingDetails = props => {
  // takes in listing as a prop, equivalent to a element in the DUMMYLISTINGS array
  const listing = props.location.listing;

  return (
    <div>
      <Header />
      <h1 id="listingtitle">{props.location.listing.title}</h1>
      <div className="container col-3 float-left text-center">
      <img id="listingimage" src="https://images.nintendolife.com/73b5ee31cad64/super-smash-bros-ultimate-cover.cover_large.jpg" />
      </div>
      <div className="container col-6">
        <p><span className="owner">Owned by: Joshua</span><span><button className="btn-like">Like!</button></span>
        <span><button className="btn-cop">Make an Offer!</button></span></p>
        <hr></hr>
        <p>Super Smash Bros. is a series of crossover fighting video games published by Nintendo, and primarily features characters from various Nintendo franchises. The series was created by Masahiro Sakurai, who has directed every game in the series.</p>
      </div>
    </div>
  );
};

export default ListingDetails;

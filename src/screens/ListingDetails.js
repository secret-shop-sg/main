import React from "react";
import Header from "../components/Main/Header";

const ListingDetails = (props) => {
  // takes in listing as a prop, equivalent to a element in the DUMMYLISTINGS array
  return (
    <div> {props.location.listing.title}
    </div>
  );
};

export default ListingDetails;

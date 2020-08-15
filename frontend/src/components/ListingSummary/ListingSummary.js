import React from "react";
import "./ListingSummary.css";
import { Container, Image } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";

const ListingSummary = (props) => {
  const imageURL = BACKEND_ADDRESS + props.itemData.imageURL;
  return (
    <div className="listing-summary-container">
      <img
        src={imageURL}
        fluid
        className="listing-summary-image"
        alt="game listed"
      />

      <div>Description</div>
    </div>
  );
};

export default ListingSummary;

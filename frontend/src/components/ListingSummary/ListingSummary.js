import React from "react";
import "./ListingSummary.css";
import { Badge } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { useHistory } from "react-router-dom";

//import logos
import XboxLogo from "../../constants/icons/xbox.svg";
import SwitchLogo from "../../constants/icons/switch.svg";
import PlaystationLogo from "../../constants/icons/playstation.svg";

const ListingSummary = (props) => {
  const listingId = props.listingId;
  const itemData = props.itemData;
  const imageURL = BACKEND_ADDRESS + itemData.imageURL;
  // history for router
  let history = useHistory();

  console.log(props.profilePic);

  // go to specific listing
  const goToListing = () => {
    history.push({
      pathname: `/listing/${itemData.title}`,
      search: `${listingId}`,
    });
  };

  const getListingDate = () => {
    const listedOn = new Date(props.listingDate);
    const sinceListed = new Date().getTime() - listedOn.getTime();
    if (sinceListed < 604800000) {
      // less than 1 week
      const days = Math.round(sinceListed / 86400000);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    // in weeks
    const weeks = Math.round(sinceListed / 604800000);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="listing-summary-container">
      <img
        src={imageURL}
        className="listing-summary-image"
        alt="game listed"
        onClick={goToListing}
      />

      <div className="listing-summary-details">
        <div className="listing-summary-title" onClick={goToListing}>
          <div className="listing-summary-name">{itemData.title}</div>
          <div className="text-muted">for {itemData.platform}</div>
        </div>
        <div className="listing-summary-owner">
          <img
            className="listing-summary-profilepic"
            src={BACKEND_ADDRESS + props.profilePic}
          />
          <div className="text-muted">
            {props.owner} listed {getListingDate()}
          </div>
        </div>
        <div className="listing-summary-types">
          {props.isTrading && (
            <div>
              <Badge variant="secondary" className="type-indicator">
                Trade
              </Badge>
              <span>&nbsp;</span>
            </div>
          )}
          {props.isRenting && (
            <div>
              <Badge variant="secondary" className="type-indicator">
                Rent
              </Badge>
              <span>&nbsp;</span>
            </div>
          )}
          {props.sellingPrice && (
            <div>
              <Badge variant="secondary" className="type-indicator">
                Buy
              </Badge>
            </div>
          )}
        </div>
        <div className="listing-summary-description">{props.description}</div>
      </div>
    </div>
  );
};

export default ListingSummary;

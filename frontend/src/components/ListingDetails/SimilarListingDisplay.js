import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_ADDRESS } from "../../constants/Details";
import "./SimilarListingDisplay.css";

const SimilarListingDisplay = (props) => {
  const listing = props.listingData;

  return (
    <React.Fragment>
      <div className="similarlistingholder">
        <div className="similarlistingimageholder">
          <Link
            to={{
              pathname: `/listing/${listing.hasItem.title}`,
              search: `${listing._id}`,
            }}
          >
            <img
              className="similarlistingimage"
              src={BACKEND_ADDRESS + listing.hasItem.imageURL}
              alt="similar listing"
            />
          </Link>
        </div>
        <Link
          to={{
            pathname: `/listing/${listing.hasItem.title}`,
            search: `${listing._id}`,
          }}
        >
          <div className="similarlistingdetailholder">
            <h5>{listing.hasItem.title}</h5>
            <img
              className="similarlistinguserdp"
              src={BACKEND_ADDRESS + listing.ownerProfilePic}
              alt={listing.owner}
            />
          </div>
        </Link>
        <Link to={`/user/${listing.owner}`}>
          <p>{listing.owner} | Rating</p>
        </Link>
        <p className="similarlistingdescription">
          {listing.description.length > 50
            ? listing.description.slice(0, 51) + "..."
            : listing.description}
        </p>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default SimilarListingDisplay;

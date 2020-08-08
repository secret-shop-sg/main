import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header";
import "../constants/styles/Bootstrap.css";
import "./styles/ListingDetails.css";
import { BsChatFill, BsHeartFill } from "react-icons/bs";
import { useAPI } from "../utils/useAPI";
import ListingDoesNotExist from "../components/ListingDetails/ListingDoesNotExist";
import { BACKEND_ADDRESS } from "../constants/Details";

const ListingDetails = (props) => {
  // todo: Check listing title
  const listingID = props.location.search.substring(1);
  const [sendRequest, isLoading] = useAPI();
  // listingToDisplay = Main listing
  const [listingToDisplay, setListingToDisplay] = useState();
  // similarListings = An array of max 3 listings on the same platform as main listing
  const [similarListings, setSimilarListings] = useState();

  useEffect(() => {
    const getListing = async () => {
      const responseData = await sendRequest(`/api/listing/id/${listingID}`);
      if (responseData) {
        setListingToDisplay(responseData.listingToDisplay);
        setSimilarListings(responseData.similarListings);
      }
    };
    getListing();
  }, [listingID, sendRequest]);

  const [liked, setliked] = useState(false);

  function likehandler() {
    setliked(!liked);
  }

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
            <span>
              <img
                className="userpicture"
                alt="User"
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
              />
            </span>
            <Link
              to={{
                pathname: `/user`,
              }}
            >
              <span>{listingToDisplay.owner}</span>
            </Link>
            <span> | </span>
            <span>Rating</span>
            <span>
              <button className="btn-cop">
                <BsChatFill />
                <span> </span>Make an Offer!
              </button>
            </span>
            <span>
              <button
                onClick={likehandler}
                className={liked ? "btn-liked" : "btn-like"}
              >
                <BsHeartFill />
                <span> </span>Like!
              </button>
            </span>
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
                  <React.Fragment>
                    <div className="similarlistingholder" key={listing._id}>
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
                            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
                            alt={listing.owner}
                          />{" "}
                        </div>
                      </Link>

                      <p>{listing.owner} | Rating</p>
                      <p className="similarlistingdescription">
                        {listing.description}
                      </p>
                    </div>

                    <hr />
                  </React.Fragment>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;

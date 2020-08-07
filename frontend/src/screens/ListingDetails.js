import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header";
import "../constants/styles/Bootstrap.css";
import "./styles/ListingDetails.css";
import { BsChatFill, BsHeartFill } from "react-icons/bs";
import { useAPI } from "../utils/useAPI";
import ListingDoesNotExist from "../components/ListingDetails/ListingDoesNotExist";

const ListingDetails = (props) => {
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
            <h2>{listingToDisplay.title}</h2>
            <h5>For the {listingToDisplay.platform}</h5>
            <img
              className="listingimage"
              src={listingToDisplay.image}
              alt={"image of " + listingToDisplay.title}
            />
          </div>
          <div className="listingdetails">
            <span>
              <img
                className="userpicture"
                alt="user"
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
                  <div
                    className="similarlistingholder"
                    key={listing.listingid}
                  >
                    <div className="similarlistingimageholder">
                      <Link
                        to={{
                          pathname: `/listing/${listing.title}`,
                          search: `${listing.listingId}`,
                        }}
                      >
                        <img
                          className="similarlistingimage"
                          src={listing.image}
                          alt="similar listing"
                        />
                      </Link>
                    </div>
                    <div className="similarlistingdetailholder">
                      <Link
                        to={{
                          pathname: `/listing/${listing.title}`,
                          search: `${listing.listingId}`,
                        }}
                      >
                        <h5>{listing.title}</h5>
                      </Link>
                      <img
                        className="similarlistinguserdp"
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
                      />
                      <p>{listing.owner} | Rating</p>
                      <p className="similarlistingdescription">
                        {listing.description.length > 50 ? listing.description.slice(0, 51) + "..." : listing.description}
                      </p>
                    </div>
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

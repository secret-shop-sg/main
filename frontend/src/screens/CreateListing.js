import React, { useState } from "react";
import { useAPI } from "../utils/useAPI";
import { useHistory } from "react-router-dom";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
//import { useSelector } from "react-redux";
import "./styles/CreateListing.css";

function CreateListing() {
  const [listedGame, setListedGame] = useState([]);
  const [sendRequest] = useAPI();
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();
  const [listingAdded, setListingAdded] = useState(false);

  const ownerID = "5f1ed6a160fc2b0d9025117c";
  const owner = "Billy";

  /*check if they added a listing yet*/
  function addListingHandler() {
    setListingAdded(!listingAdded);
  }
  /* uncomment after page completed
  const ownerID = useSelector((state) => state.user.userId);
  const owner = 
  */

  const deselectGame = () => {
    setListedGame([]);
  };

  // function that triggers when user submits the form.
  // Todo: link to api when all data is available
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest("/api/listing/add", "POST", {
      // change the fields below to the actual fields
      ownerID,
      owner,
      /*
      description
      wantsItem,
      sellingPrice,
      rentalPrice
      */
    });

    // responseData returns the user's userID
    if (responseData) {
      if (responseData.listingID) {
        //history.push("/listing")
      }
    }
  };

  const checkBoxHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Header />
      <div className="imageUploader">
        <div>
          {!listedGame[0] ? (
            <GrGallery id="galleryimage" size={100} />
          ) : (
            <img
              className="selected-listing-game-image gallery-image "
              src={BACKEND_ADDRESS + listedGame[0].imageURL}
              alt={listedGame.title}
              onClick={deselectGame}
            />
          )}
        </div>
        <div>
          <button id="uploadButton">Click here to upload an image!</button>
        </div>
      </div>
      <div className="uploadDetails">
        <form>
          <p className="inputHeader">Title</p>
          {!listedGame[0] ? (
            <input
              type="text"
              id="title"
              className="listinginput"
              name="title"
              placeholder="eg. SSBU for Trade; Animal Crossing for Rent; Kirby Star Allies for sale"
            />
          ) : (
            <h5>{listedGame[0].title}</h5>
          )}
          <p className="inputHeader2">Description</p>
          <textarea
            placeholder="eg. Near Mint, date bought etc."
            className="listinginput"
            name="description"
            rows="4"
            cols="50"
          ></textarea>
          <hr />
          <div className="conditions">
            <h2> Your Conditions</h2>
            <input type="checkbox" onClick={checkBoxHandler} />
            <label>
              Sell for: $
              <input type="text" disabled={!isChecked} />
            </label>
            <br />
            <hr />
            <input type="checkbox" />
            <label>
              Rent for: $
              <input type="text" /> /day
            </label>
            <br />
            <hr />
            <input type="checkbox" />
            <label>
              Trade for: <input type="text" />
              <GoPlus />
            </label>
            <br />
            <br />
          </div>
          <hr />
          <div className="games-component-body">
            <AddGames
              setSelectedGames={setListedGame}
              selectedGames={listedGame}
              maxSelectionSize={1}
            />
          </div>
          <input type="submit" value="Add Listing" />
        </form>
      </div>
    </div>
  );
}

export default CreateListing;

import React, { useState } from "react";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { BACKEND_ADDRESS } from "../constants/Details";
import "./styles/CreateListing.css";
function CreateListing() {
  const [listedGame, setListedGame] = useState([]);

  const deselectGame = () => {
    setListedGame([]);
  };

  // function that triggers when user submits the form.
  // Todo: link to api when all data is available
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Header />
      <div className="imageUploader">
        <div>
          <GrGallery id="galleryimage" size={100} />
        </div>
        <div>
          <button id="uploadButton">Click here to upload an image!</button>
        </div>
      </div>
      <div className="uploadDetails">
        <form>
          <p className="inputHeader">Title</p>
          <input
            type="text"
            id="title"
            className="listinginput"
            name="title"
            placeholder="eg. SSBU for Trade; Animal Crossing for Rent; Kirby Star Allies for sale"
          />
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
            <input type="checkbox" id="sell" name="sell" value="Sell" />
            <label>
              Sell for: $ <span> </span>
              <input type="text"></input>
            </label>
            <br />
            <hr />
            <input type="checkbox" id="rent" name="rent" value="Rent" />
            <label>
              Rent for: $ <span> </span>
              <input type="text"></input> /day
            </label>
            <br />
            <hr />
            <input type="checkbox" id="trade" name="trade" value="Trade" />
            <label>
              Trade for: <input type="text"></input>
              <GoPlus />
            </label>
            <br />
            <br />
          </div>
          <hr />
          {listedGame[0] && (
            <div>
              <img
                className="selected-listing-game-image"
                src={BACKEND_ADDRESS + listedGame[0].imageURL}
                alt={listedGame.title}
                onClick={deselectGame}
              />
            </div>
          )}
          <AddGames
            setSelectedGames={setListedGame}
            selectedGames={listedGame}
            maxSelectionSize={1}
          />
          <input type="submit" onSubmit={onSubmitHandler} value="Add Listing" />
        </form>
      </div>
    </div>
  );
}

export default CreateListing;

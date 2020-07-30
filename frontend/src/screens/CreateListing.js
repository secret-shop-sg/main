import React, { useState } from "react";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import "./styles/CreateListing.css";
function CreateListing() {
  const [listedGame, setListedGame] = useState([{ id: null, imageURL: null }]);
  console.log(listedGame);

  const deselectGame = () => {
    setListedGame([{ id: null, imageURL: null }]);
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
          {listedGame[0].id && (
            <div>
              <img
                className="selected-listing-game-image"
                src={listedGame[0].imageURL}
                alt="Selected Game"
                onClick={deselectGame}
              />
            </div>
          )}
          <AddGames setSelectedGame={setListedGame} selectedGame={listedGame} />
        </form>
      </div>
    </div>
  );
}

export default CreateListing;

import React, { useState } from "react";
import { useAPI } from "../utils/useAPI";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
//import { useSelector } from "react-redux";
import "./styles/CreateListing.css";
import AntiLoginError from "../components/Shared/AntiLoginError";

function CreateListing() {
  const [listedGame, setListedGame] = useState([]);
  const [gamesWanted, setGamesWanted] = useState([]);
  const [sendRequest] = useAPI();
  const [description, setDescription] = useState();
  const [listingAdded, setListingAdded] = useState(false);
  const [sellingPrice, setSellingPrice] = useState();
  const [rentalPrice, setRentalPrice] = useState();
  const [loggedIn, setLoggedIn] = useState(true);

  const ownerID = "5f29504f0f1bc35a048e5b70";
  const owner = "test";

  //const owner = useSelector((state) => state.user.userId);
  /* uncomment after page completed*/

  /*check if they added a listing yet*/
  function addListingHandler() {
    setListingAdded(!listingAdded);
  }

  const deselectGame = () => {
    setListedGame([]);
  };

  // function that triggers when user submits the form.
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest("/api/listing/add", "POST", {
      // change the fields below to the actual fields
      hasItem: listedGame[0],
      ownerID,
      owner,
      description,
      sellingPrice,
      rentalPrice,
    });

    // responseData returns the user's userID
    if (responseData) {
      if (responseData.listingID) {
        alert("listing created");
        //history.push("/listing")
      }
    }
  };
  const deselectGameWanted = (event, index) => {
    setGamesWanted((games) => games.filter((_, i) => i !== index));
  };

  const onChangeInputHandler = (event) => {
    switch (event.target.id) {
      case "sell-textbox":
        setSellingPrice(event.target.value);
        break;
      case "rent-textbox":
        setRentalPrice(event.target.value);
        break;
      case "description-textbox":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      {loggedIn ? (
        <div>
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
            <p className="inputHeader">Game</p>
            {!listedGame[0] ? null : <h5>{listedGame[0].title}</h5>}
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
              id="description-textbox"
              onChange={onChangeInputHandler}
              rows="4"
              cols="50"
            />
            <hr />
            <div className="conditions">
              <h2> Your Conditions</h2>
              <input
                type="checkbox"
                onClick={(event) =>
                  (document.getElementById("sell-textbox").disabled = !event
                    .target.checked)
                }
              />
              <label>
                Sell for: $
                <input
                  type="text"
                  id="sell-textbox"
                  disabled={true}
                  onChange={onChangeInputHandler}
                />
              </label>
              <br />
              <hr />
              <input
                type="checkbox"
                onClick={(event) =>
                  (document.getElementById("rent-textbox").disabled = !event
                    .target.checked)
                }
              />
              <label>
                Rent for: $
                <input
                  type="text"
                  id="rent-textbox"
                  disabled={true}
                  onChange={onChangeInputHandler}
                />{" "}
                /day
              </label>
              <br />
              <hr />
              <input type="checkbox" />
              <label>
                Trade for:
                <GoPlus />
                <div>
                  <div
                    className="games-component-body"
                    style={{ borderRight: "1px solid lightgray" }}
                  >
                    <AddGames
                      setSelectedGames={setGamesWanted}
                      selectedGames={gamesWanted}
                      maxSelectionSize={10}
                    />
                  </div>
                  <div className="game-selector-body">
                    <h4> Your selections</h4>
                    {gamesWanted.map((game, index) => (
                      <img
                        onClick={(event) => deselectGameWanted(event)}
                        src={BACKEND_ADDRESS + game.imageURL}
                        key={index}
                        alt={game.title}
                      />
                    ))}
                  </div>
                </div>
              </label>
              <br />
              <br />
            </div>
            <hr />
            <input
              type="button"
              onClick={onSubmitHandler}
              value="Add Listing"
            />
          </div>

          <div className="games-component-body">
            <AddGames
              setSelectedGames={setListedGame}
              selectedGames={listedGame}
              maxSelectionSize={1}
            />
          </div>
        </div>
      ) : (
        <AntiLoginError />
      )}
    </div>
  );
}

export default CreateListing;

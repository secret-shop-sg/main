import React, { useState, useReducer, useCallback } from "react";
import { useAPI } from "../utils/useAPI";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Header/Header";
import AddGames from "../components/Shared/AddGames";
import { GrGallery } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
//import { useSelector } from "react-redux";
import "./styles/CreateListing.css";
import AntiLoginError from "../components/Shared/AntiLoginError";

// reducer for new listing data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update listing values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // validity?

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
      };
    default:
      return state;
  }
};

function CreateListing() {
  // use reducer for listing values
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      listedGame: [],
      gamesWanted: [],
      description: "",
      sellingPrice: "",
      rentalPrice: "",
    },
  });

  const [sendRequest] = useAPI();
  const [listingAdded, setListingAdded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  // set listed game
  const setListedGame = useCallback(
    (games) => {
      dispatchForm({
        type: "UPDATE",
        input: "listedGame",
        value: games,
      });
    },
    [dispatchForm]
  );

  // set games wanted
  const setGamesWanted = useCallback(
    (games) => {
      dispatchForm({
        type: "UPDATE",
        input: "gamesWanted",
        value: games,
      });
    },
    [dispatchForm]
  );

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
    const responseData = await sendRequest(
      "/api/listing/add",
      "POST",
      {
        hasItem: formState.inputValues.listedGame[0],
        description: formState.inputValues.description,
        sellingPrice: formState.inputValues.sellingPrice,
        rentalPrice: formState.inputValues.rentalPrice,
        wantsItem: formState.inputValues.gamesWanted,
      },
      true
    );

    if (responseData) {
      if (responseData.listingID) {
        alert("listing created");
        //history.push("/listing")
      }
    }
  };
  const deselectGameWanted = (index) => {
    setGamesWanted(
      formState.inputValues.gamesWanted.filter((_, i) => i !== index)
    );
  };

  const onChangeInputHandler = (event) => {
    dispatchForm({
      type: "UPDATE",
      input: event.target.id,
      value: event.target.value,
    });
  };

  return (
    <div>
      <Header />
      {loggedIn ? (
        <div>
          <div className="imageUploader">
            <div>
              {!formState.inputValues.listedGame[0] ? (
                <GrGallery id="galleryimage" size={100} />
              ) : (
                <img
                  className="selected-listing-game-image gallery-image "
                  src={
                    BACKEND_ADDRESS +
                    formState.inputValues.listedGame[0].imageURL
                  }
                  alt={formState.inputValues.listedGame.title}
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
            {!formState.inputValues.listedGame[0] ? null : (
              <h5>{formState.inputValues.listedGame[0].title}</h5>
            )}
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
              id="description"
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
                  (document.getElementById("sellingPrice").disabled = !event
                    .target.checked)
                }
              />
              <label>
                Sell for: $
                <input
                  type="text"
                  id="sellingPrice"
                  disabled={true}
                  onChange={onChangeInputHandler}
                />
              </label>
              <br />
              <hr />
              <input
                type="checkbox"
                onClick={(event) =>
                  (document.getElementById("rentalPrice").disabled = !event
                    .target.checked)
                }
              />
              <label>
                Rent for: $
                <input
                  type="text"
                  id="rentalPrice"
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
                      selectedGames={formState.inputValues.gamesWanted}
                      maxSelectionSize={10}
                    />
                  </div>
                  <div className="game-selector-body">
                    <h4> Your selections</h4>
                    {formState.inputValues.gamesWanted.map((game, index) => (
                      <img
                        onClick={() => deselectGameWanted(index)}
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
              selectedGames={formState.inputValues.listedGame}
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

import React, { useState, useEffect, useReducer, useCallback } from "react";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { useAPI } from "../utils/useAPI";
import { BACKEND_ADDRESS } from "../constants/Details";
import "./styles/UpdateProfile.css";
import { FiEdit2 } from "react-icons/fi";
import ImageUpload from "../components/UpdateProfile/ImageUpload";
//import { useSelector } from "react-redux";
import AntiLoginError from "../components/Shared/AntiLoginError";

// reducer for update profile data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update profile values
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
    case "SET_VALUES":
      // set initial values
      return {
        ...state,
        inputValues: action.values,
      };

    default:
      return state;
  }
};

function UpdateProfile() {
  // use reducer for profile data
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      description: "",
      inventory: [],
      wishlist: [],
      profilePic: "",
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [editInventoryMode, setEditInventoryMode] = useState(false);
  const [editWishlistMode, setEditWishlistMode] = useState(false);
  const [sendRequest] = useAPI();

  // change to the following when this page is done
  //const userID = useSelector((state) => state.user.userId);
  const userID = "5f29504f0f1bc35a048e5b70";

  // when input value of any input field changes
  const inputChangeHandler = useCallback(
    (event) => {
      dispatchForm({
        type: "UPDATE",
        value: event.target.value,
        input: event.target.name,
      });
    },
    [dispatchForm]
  );

  // function to set selected games
  const setSelectedGames = useCallback(
    (inputIdentifier, games) => {
      console.log(games);
      dispatchForm({
        type: "UPDATE",
        value: games,
        input: inputIdentifier,
      });
    },
    [dispatchForm]
  );

  // function to set image
  const setProfilePic = useCallback((newPic) => {
    dispatchForm({
      type: "UPDATE",
      value: newPic,
      input: "profilePic",
    });
  });

  // fetch values when user id is changed
  useEffect(() => {
    // fetch data
    const getUserData = async () => {
      const responseData = await sendRequest(`/api/user/id/${userID}`);
      if (responseData) {
        if (responseData.matchedUser) {
          const user = responseData.matchedUser;

          // initalize values in reducer
          dispatchForm({
            type: "SET_VALUES",
            values: {
              username: user.username,
              password: user.password,
              description: user.description,
              inventory: user.inventory,
              wishlist: user.wishlist,
              profilePic: user.profilePicURL,
            },
          });
        }
      }
    };
    getUserData();
  }, [userID]);

  const deselectGame = useCallback(
    (event, index) => {
      let collection;

      switch (event.target.name) {
        case "inventory":
          collection = formState.inputValues.inventory;
          break;
        case "wishlist":
          collection = formState.inputValues.wishlist;
          break;
        default:
          break;
      }

      dispatchForm({
        type: "UPDATE",
        value: collection.filter((_, i) => i !== index),
        input: event.target.name,
      });
    },
    [formState, dispatchForm]
  );

  const updateDetails = useCallback(
    async (event) => {
      event.preventDefault();
      let formData = new FormData();
      formData.append("image", formState.inputValues.profilePic);
      formData.append("username", formState.inputValues.username);
      formData.append("password", formState.inputValues.password);
      formData.append("description", formState.inputValues.description);
      const responseData = await sendRequest(
        `/api/user/update/details/${userID}`,
        "PATCH",
        formData,
        true
      );

      if (responseData) {
        console.log(responseData);
        if (responseData.userID === userID) {
          setEditMode(false);
          alert("Update successful");
        }
      }
    },
    [formState, userID]
  );

  const updateInventory = useCallback(
    async (event) => {
      event.preventDefault();

      const updatedInventory = formState.inputValues.inventory;

      const responseData = await sendRequest(
        `/api/user/update/inventory/${userID}`,
        "PATCH",
        { inventory: updatedInventory }
      );

      if (responseData) {
        if (responseData.userID === userID) {
          setEditInventoryMode(false);
          alert("Update successful");
        }
      }
    },
    [formState, sendRequest]
  );

  const updateWishlist = useCallback(
    async (event) => {
      event.preventDefault();

      const updatedWishlist = formState.inputValues.wishlist;

      const responseData = await sendRequest(
        `/api/user/update/wishlist/${userID}`,
        "PATCH",
        { wishlist: updatedWishlist }
      );

      if (responseData) {
        if (responseData.userID === userID) {
          setEditWishlistMode(false);
          alert("Update successful");
        }
      }
    },
    [formState]
  );

  return (
    <div>
      <Header />
      {userID ? (
        <div>
          <ImageUpload
            userID={userID}
            username={formState.inputValues.username}
          />
          <div className="userInformation">
            <p className="inputHeader">Username</p>
            {!editMode ? (
              <div className="currentinfo">
                <span>{formState.inputValues.username}</span>
              </div>
            ) : (
              <span>
                <input
                  type="text"
                  className="infoupdater"
                  name="username"
                  onChange={inputChangeHandler}
                  value={formState.inputValues.username}
                />
              </span>
            )}
            <hr></hr>
            <p className="inputHeader">Password</p>
            {!editMode ? (
              <div className="currentinfo">
                <span>{formState.inputValues.password.replace(/./g, "*")}</span>
              </div>
            ) : (
              <span>
                <input
                  type="password"
                  className="infoupdater"
                  name="password"
                  onChange={inputChangeHandler}
                  value={formState.inputValues.password}
                />
                <p className="inputHeader">Confirm Password</p>
                <input
                  type="password"
                  className="infoupdater"
                  name="password"
                  onChange={inputChangeHandler}
                  value={formState.inputValues.password}
                />
              </span>
            )}
            <hr />
            <p className="inputHeader">Description</p>
            {!editMode ? (
              <div className="currentinfo">
                <span>{formState.inputValues.description || ""}</span>
              </div>
            ) : (
              <span>
                <textarea
                  type="text"
                  className="infoupdater"
                  name="description"
                  onChange={inputChangeHandler}
                  value={formState.inputValues.description || ""}
                />
              </span>
            )}
            <hr />
            {!editMode ? (
              <button onClick={() => setEditMode(true)}>
                <FiEdit2 /> Update
              </button>
            ) : (
              <button className="saveButton" onClick={updateDetails}>
                Save
              </button>
            )}
            <hr />
            <span>
              <p className="inputHeader">
                Inventory
                <span> </span>
                {!editInventoryMode ? (
                  <button onClick={() => setEditInventoryMode(true)}>
                    <FiEdit2 /> Update Inventory
                  </button>
                ) : (
                  <button className="saveButton" onClick={updateInventory}>
                    Save
                  </button>
                )}
              </p>
            </span>

            {formState.inputValues.inventory &&
              formState.inputValues.inventory.map((game, index) => (
                <div className="selected-inventory-games" key={index}>
                  <img
                    src={BACKEND_ADDRESS + game.imageURL}
                    alt={game.title}
                    onClick={
                      editInventoryMode
                        ? (event) => deselectGame(event, index)
                        : null
                    }
                    name="inventory"
                  />
                </div>
              ))}
            {editInventoryMode ? (
              <div>
                <AddGames
                  setSelectedGames={setSelectedGames.bind(this, "inventory")}
                  selectedGames={formState.inputValues.inventory}
                  maxSelectionSize={3}
                />
              </div>
            ) : null}
            <hr />
            <span>
              <p className="inputHeader">
                Wishlist
                {!editWishlistMode ? (
                  <button onClick={() => setEditWishlistMode(true)}>
                    <FiEdit2 /> Update Wishlist
                  </button>
                ) : (
                  <button className="saveButton" onClick={updateWishlist}>
                    Save
                  </button>
                )}
              </p>
            </span>
            {formState.inputValues.wishlist &&
              formState.inputValues.wishlist.map((game, index) => (
                <div className="selected-inventory-games" key={index}>
                  <img
                    src={BACKEND_ADDRESS + game.imageURL}
                    alt={game.title}
                    onClick={
                      editWishlistMode
                        ? (event) => deselectGame(event, index)
                        : null
                    }
                    name="wishlist"
                  />
                </div>
              ))}
            {editWishlistMode ? (
              <div className="update-user-game-images-div">
                <AddGames
                  setSelectedGames={setSelectedGames.bind(this, "wishlist")}
                  selectedGames={formState.inputValues.wishlist}
                  maxSelectionSize={3}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <AntiLoginError />
      )}
    </div>
  );
}

export default UpdateProfile;

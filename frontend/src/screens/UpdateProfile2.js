import React, { useEffect, useReducer, useState } from "react";
import "./styles/UpdateProfile.css";
import { useAPI } from "../utils/useAPI";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Header/Header";
import { Image, Form, Button, ButtonGroup } from "react-bootstrap";
import ConfigureGames from "../components/Shared/ConfigureGames";

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

const UpdateProfile = (props) => {
  const [sendRequest] = useAPI();
  const [isEditing, setIsEditing] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

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

  // fetch values when user id is changed
  useEffect(() => {
    // fetch data
    const getUserData = async () => {
      const responseData = await sendRequest(
        `/api/user/id`,
        undefined,
        undefined,
        true
      );
      console.log(responseData);
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
  }, [sendRequest]);

  // if update details is pressed
  const updateDetailsHandler = () => {
    setIsEditing(true);
  };

  // sending details (username & description only)
  const confirmDetailsHandler = () => {
    setIsEditing(false);
    // TODO: validation + send to backend
  };

  // toggle visibility of inventory modal
  const toggleInventoryModal = () => {
    setShowInventoryModal(!showInventoryModal);
  };

  // toggle visibility of wishlist modal
  const toggleWishlistModal = () => {
    setShowWishlistModal(!showWishlistModal);
  };

  return (
    <div>
      <Header />
      <div className="update-profile-screen">
        <div className="update-profile-general-details">
          <div className="update-profile-img">
            <Image
              src={BACKEND_ADDRESS + formState.inputValues.profilePic}
              rounded
              style={{ height: "40vh" }}
            />
            <Button variant="outline-dark mt-1">Update picture</Button>
          </div>
          <div className="update-profile-details">
            <h1 class="display-4">Update Profile</h1>
            <div>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    readOnly={!isEditing}
                    value={formState.inputValues.username}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    readOnly={!isEditing}
                    value={formState.inputValues.description}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="align-self-center">
              {!isEditing && (
                <ButtonGroup>
                  <Button variant="outline-dark" onClick={updateDetailsHandler}>
                    Update details
                  </Button>
                  <Button variant="outline-dark">Change password</Button>
                </ButtonGroup>
              )}
              {isEditing && (
                <Button variant="outline-dark" onClick={confirmDetailsHandler}>
                  Confirm changes
                </Button>
              )}
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="p-3">
          <div className="update-profile-games-label">
            <h1 class="display-4">Inventory</h1>
            <Button variant="outline-dark" onClick={toggleInventoryModal}>
              Update inventory
            </Button>
          </div>
          <div>
            {formState.inputValues.inventory &&
              formState.inputValues.inventory.map((game, index) => (
                <div className="selected-inventory-games" key={index}>
                  <img src={BACKEND_ADDRESS + game.imageURL} alt={game.title} />
                </div>
              ))}
          </div>
        </div>
        <hr></hr>
        <div className="p-3">
          <div className="update-profile-games-label">
            <h1 class="display-4">Wishlist</h1>
            <Button variant="outline-dark" onClick={toggleWishlistModal}>
              Update wishlist
            </Button>
          </div>
          <div>
            {formState.inputValues.wishlist &&
              formState.inputValues.wishlist.map((game, index) => (
                <div className="selected-inventory-games" key={index}>
                  <img src={BACKEND_ADDRESS + game.imageURL} alt={game.title} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ConfigureGames show={showInventoryModal} toggle={toggleInventoryModal} />
      <ConfigureGames show={showWishlistModal} toggle={toggleWishlistModal} />
    </div>
  );
};

export default UpdateProfile;

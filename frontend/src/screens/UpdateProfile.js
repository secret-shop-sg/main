import React, { useEffect, useReducer, useState } from "react";
import "./styles/UpdateProfile.css";
import { useAPI } from "../utils/useAPI";
import { BACKEND_ADDRESS } from "../constants/Details";
import Header from "../components/Header/Header";
import { Image, Form, Button, ButtonGroup } from "react-bootstrap";
import ConfigureGames from "../components/Shared/ConfigureGames";
import ChangePassword from "../components/UpdateProfile/ChangePassword";
import ChangePicture from "../components/UpdateProfile/ChangePicture";

// reducer for update profile data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update profile values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // accepted
      const updatedAccepted = {
        ...state.inputAccepted,
        [action.input]: action.accepted,
      };

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
        inputAccepted: updatedAccepted,
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
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePic, setShowChangePic] = useState(false);

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
    inputAccepted: {
      username: true,
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
      if (responseData && responseData.matchedUser) {
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
    };
    getUserData();
  }, [sendRequest]);

  // if update details is pressed
  const updateDetailsHandler = () => {
    setIsEditing(true);
  };

  // sending details (username & description only)
  const confirmDetailsHandler = async () => {
    // TODO: validation

    // send to backend
    const responseData = await sendRequest(
      `/api/user/update/details/`,
      "PATCH",
      {
        username: formState.inputValues.username,
        description: formState.inputValues.description,
      },
      true
    );

    if (responseData) {
      if (responseData.dataUpdated) {
        setIsEditing(false);
        alert("Update successful");
        return;
      }
    }
  };

  // toggle visibility of inventory modal
  const toggleInventoryModal = () => {
    setShowInventoryModal(!showInventoryModal);
  };

  // toggle visibility of wishlist modal
  const toggleWishlistModal = () => {
    setShowWishlistModal(!showWishlistModal);
  };

  // toggle visibility of password modal
  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  // toggle visibility of profile pic modal
  const toggleChangePic = () => {
    setShowChangePic(!showChangePic);
  };

  // when input value of any input field changes
  const inputChangeHandler = async (event) => {
    let isAccepted = false;

    if (event.target.name === "username") {
      // check if username is already taken
      const responseData = await sendRequest(
        "/api/user/validate/username",
        "POST",
        {
          username: event.target.value,
        }
      );

      if (responseData) {
        isAccepted = responseData.isValid;
      }
    }

    dispatchForm({
      type: "UPDATE",
      value: event.target.value,
      input: event.target.name,
      accepted: isAccepted,
    });
  };

  // save changes for the configuregames component
  const saveGameChanges = async (name, selectedGames) => {
    const responseData = await sendRequest(
      `/api/user/update/${name}/`,
      "PATCH",
      { [name]: selectedGames },
      true
    );

    if (responseData) {
      if (responseData.dataUpdated) {
        // update data in parent page
        dispatchForm({
          type: "UPDATE",
          value: selectedGames,
          input: name,
        });

        alert("Update successful");
        return;
      }
    }

    alert("failed");
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
            <Button variant="outline-dark mt-1" onClick={toggleChangePic}>
              Update picture
            </Button>
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
                    onChange={inputChangeHandler}
                    isValid={
                      isEditing &&
                      formState.inputValues.username &&
                      formState.inputAccepted.username
                    }
                    isInvalid={
                      isEditing &&
                      formState.inputValues.username &&
                      !formState.inputAccepted.username
                    }
                  />
                  <Form.Control.Feedback type="valid">
                    Username is available
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Username is unavailable
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    readOnly={!isEditing}
                    value={formState.inputValues.description}
                    name="description"
                    onChange={inputChangeHandler}
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
                  <Button variant="outline-dark" onClick={toggleChangePassword}>
                    Change password
                  </Button>
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
          <div className="update-profile-games-display">
            {formState.inputValues.inventory &&
              formState.inputValues.inventory.map((game, index) => (
                <div key={index}>
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
          <div className="update-profile-games-display">
            {formState.inputValues.wishlist &&
              formState.inputValues.wishlist.map((game, index) => (
                <div key={index}>
                  <img src={BACKEND_ADDRESS + game.imageURL} alt={game.title} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ConfigureGames
        label="Inventory"
        name="inventory"
        show={showInventoryModal}
        toggle={toggleInventoryModal}
        selectedGames={formState.inputValues.inventory}
        dispatchUpdate={dispatchForm}
        saveChanges={saveGameChanges.bind(this, "inventory")}
      />
      <ConfigureGames
        label="Wishlist"
        name="wishlist"
        show={showWishlistModal}
        toggle={toggleWishlistModal}
        selectedGames={formState.inputValues.wishlist}
        dispatchUpdate={dispatchForm}
        saveChanges={saveGameChanges.bind(this, "wishlist")}
      />
      <ChangePassword show={showChangePassword} toggle={toggleChangePassword} />
      <ChangePicture
        show={showChangePic}
        toggle={toggleChangePic}
        currentPic={formState.inputValues.profilePic}
        username={formState.inputValues.username}
      />
    </div>
  );
};

export default UpdateProfile;

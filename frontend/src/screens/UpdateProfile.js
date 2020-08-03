import React, { useState, useEffect } from "react";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { useAPI } from "../utils/useAPI";
import "./styles/UpdateProfile.css";
import { FiEdit2 } from "react-icons/fi";
import ImageUpload from "../components/UpdateProfile/ImageUpload";
// import { useSelector } from "react-redux";

function UpdateProfile() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [description, setDescription] = useState();
  const [inventory, setInventory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [newImage, setNewImage] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editInventoryMode, setEditInventoryMode] = useState(false);
  const [editWishlistMode, setEditWishlistMode] = useState(false);
  const [sendRequest] = useAPI();
  const [displayPassword, setDisplayPassword] = useState();
  // change to the following when this page is done
  // const userID = useSelector((state) => state.user.userId);

  const userID = "5f1ed6a160fc2b0d9025117c";

  useEffect(() => {
    const getUserData = async () => {
      const responseData = await sendRequest(`/api/user/id/${userID}`);
      if (responseData) {
        if (responseData.matchedUser) {
          const user = responseData.matchedUser;
          setPassword(user.password);
          setUsername(user.username);
          setDescription(user.description);
          setInventory(user.inventory);
          setWishlist(user.wishlist);
          setProfilePic(user.profilePicURL);
          setDisplayPassword(
            responseData.matchedUser.password.replace(/./g, "*")
          );
        }
      }
    };
    getUserData();
  }, [userID, sendRequest]);

  const deselectGame = (event, index) => {
    switch (event.target.name) {
      case "inventory":
        setInventory((inventory) => inventory.filter((_, i) => i !== index));
        break;
      case "wishlist":
        setWishlist((wishlist) => wishlist.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const inputChangeHandler = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        setDisplayPassword(event.target.value.replace(/./g, "*"));
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  const updateDetails = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", newImage);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("description", description);
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
  };

  const updateInventory = async (event) => {
    event.preventDefault();

    const responseData = await sendRequest(
      `/api/user/update/inventory/${userID}`,
      "PATCH",
      { inventory }
    );

    if (responseData) {
      if (responseData.userID === userID) {
        setEditInventoryMode(false);
        alert("Update successful");
      }
    }
  };

  const updateWishlist = async (event) => {
    event.preventDefault();

    const responseData = await sendRequest(
      `/api/user/update/wishlist/${userID}`,
      "PATCH",
      { wishlist }
    );

    if (responseData) {
      if (responseData.userID === userID) {
        setEditWishlistMode(false);
        alert("Update successful");
      }
    }
  };
  return (
    <div>
      <Header />
      <ImageUpload imageData={{ profilePic, newImage, setNewImage }} />
      <div className="userInformation">
        <p className="inputHeader">Username</p>
        {!editMode ? (
          <div className="currentinfo">
            <span>{username}</span>
          </div>
        ) : (
          <span>
            <input
              type="text"
              className="infoupdater"
              name="username"
              onChange={inputChangeHandler}
              value={username}
            />
          </span>
        )}
        <hr></hr>
        <p className="inputHeader">Password</p>
        {!editMode ? (
          <div className="currentinfo">
            <span>{displayPassword}</span>
          </div>
        ) : (
          <span>
            <input
              type="password"
              className="infoupdater"
              name="password"
              onChange={inputChangeHandler}
              value={password}
            />
            <p className="inputHeader">Confirm Password</p>
            <input
              type="password"
              className="infoupdater"
              name="password"
              onChange={inputChangeHandler}
              value={password}
            />
          </span>
        )}
        <hr />
        <p className="inputHeader">Description</p>
        {!editMode ? (
          <div className="currentinfo">
            <span>{description}</span>
          </div>
        ) : (
          <span>
            <textarea
              type="text"
              className="infoupdater"
              name="description"
              onChange={inputChangeHandler}
              value={description}
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

        {inventory &&
          inventory.map((game, index) => (
            <div className="selected-inventory-games" key={index}>
              <img
                src={game.imageURL}
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
              setSelectedGames={setInventory}
              selectedGames={inventory}
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
        {wishlist &&
          wishlist.map((game, index) => (
            <div className="selected-inventory-games" key={index}>
              <img
                src={game.imageURL}
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
              setSelectedGames={setWishlist}
              selectedGames={wishlist}
              maxSelectionSize={3}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UpdateProfile;

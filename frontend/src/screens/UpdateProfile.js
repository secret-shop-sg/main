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
  const [editMode, setEditMode] = useState(false);
  const [sendRequest] = useAPI();
  // change to the following when this page is done
  // const userID = useSelector((state) => state.user.userId);

  const userID = "5f1ed6a160fc2b0d9025117c";

  useEffect(() => {
    const getUserData = async () => {
      const responseData = await sendRequest(`/api/user/id/${userID}`);
      if (responseData) {
        if (responseData.matchedUser) {
          let passwordHidden = responseData.matchedUser.password.replace(
            /./g,
            "*"
          );
          setPassword(passwordHidden);

          setUsername(responseData.matchedUser.username);
          setDescription(responseData.matchedUser.description);
          setInventory(responseData.matchedUser.inventory);
          setWishlist(responseData.matchedUser.wishlist);
        }
      }
    };
    getUserData();
  }, [userID]);

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
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest(
      `/api/user/update/${userID}`,
      "PATCH",
      {
        username,
        password,
        description,
        inventory,
        wishlist,
      }
    );
    if (responseData) {
      if (responseData.userID === userID) {
        setEditMode(false);
        alert("Update successful");
      }
    }
  };

  return (
    <div>
      <Header />
      <ImageUpload />
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
            <span>{password}</span>
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
          <button className="saveButton" onClick={onSubmitHandler}>
            Save
          </button>
        )}
        <hr />
        <p className="inputHeader">Inventory</p>
        {inventory &&
          inventory.map((game, index) => (
            <div className="selected-inventory-games">
              <img
                className="selected-inventory-game-images"
                src={game.imageURL}
                key={index}
                alt={game.title}
                onClick={(event) => deselectGame(event, index)}
                name="inventory"
              />
            </div>
          ))}
        <div>
          <AddGames
            setSelectedGames={setInventory}
            selectedGames={inventory}
            maxSelectionSize={3}
          />
        </div>
        <hr />
        <p className="inputHeader">Wishlist</p>
        {wishlist &&
          wishlist.map((game, index) => (
            <div className="selected-inventory-games">
              <img
                className="selected-inventory-game-images"
                src={game.imageURL}
                key={index}
                alt={game.title}
                onClick={(event) => deselectGame(event, index)}
                name="wishlist"
              />
            </div>
          ))}
        <div className="update-user-game-images-div">
          <AddGames
            setSelectedGames={setWishlist}
            selectedGames={wishlist}
            maxSelectionSize={3}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;

import React, { useState, useEffect } from "react";
import Header from "../components/Shared/Header";
import AddGames from "../components/Shared/AddGames";
import { useAPI } from "../utils/useAPI";
import "./styles/UpdateProfile.css";
import { FiEdit2 } from "react-icons/fi";
import ImageUpload from "../components/UpdateProfile/ImageUpload";
// import { useSelector } from "react-redux";

function UpdateProfile() {
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [inventory, setInventory] = useState([]);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [sendRequest] = useAPI();
  // change to the following when this page is done
  // const userID = useSelector((state) => state.user.userId);

  const userID = "5f1ed6a160fc2b0d9025117c";

  useEffect(() => {
    const getUserData = async () => {
      const responseData = await sendRequest(`/api/user/id/${userID}`);
      if (responseData) {
        if (responseData.matchedUser) {
          setUsername(responseData.matchedUser.username);
          setPassword(responseData.matchedUser.password);
          setDescription(responseData.matchedUser.description);
        }
      }
    };
    getUserData();
  }, [userID]);

  const deselectInventory = (index) => {
    setInventory((inventory) => inventory.filter((_, i) => i !== index));
  };

  const deselectWishlist = (index) => {
    setWishlist((wishlist) => wishlist.filter((_, i) => i !== index));
  };

  function usernameHandler() {
    setEditUsername(!editUsername);
  }
  function passwordHandler() {
    setEditPassword(!editPassword);
  }
  function descriptionHandler() {
    setEditDescription(!editDescription);
  }
  const inputUsernameChangeHandler = (inputIdentifier, value) => {
    setUsername(value);
  };
  const inputPasswordChangeHandler = (inputIdentifier, value) => {
    setPassword(value);
  };
  const inputDescriptionChangeHandler = (inputIdentifier, value) => {
    setDescription(value);
  };

  /*
temp image: 
<img
          className="currentPicture"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
        />
  */
  return (
    <div>
      <Header />
      <ImageUpload />
      <div className="userInformation">
        <p className="inputHeader">Username</p>
        {!editUsername ? (
          <div className="currentinfo">
            <span>{username}</span>
            <span>
              <FiEdit2 className="editIcon" onClick={usernameHandler} />
            </span>
          </div>
        ) : (
          <span>
            <input
              type="text"
              id="username"
              className="infoupdater"
              name="username"
              onChange={(e) =>
                inputUsernameChangeHandler(e.target.id, e.target.value)
              }
            />
            <span>
              <button className="saveButton" onClick={usernameHandler}>
                Save
              </button>
            </span>
          </span>
        )}
        <hr></hr>
        <p className="inputHeader">Password</p>
        {!editPassword ? (
          <div className="currentinfo">
            <span className="secret">******</span>
            <span>{password}</span>
            <span>
              <FiEdit2 className="editIcon" onClick={passwordHandler} />
            </span>
          </div>
        ) : (
          <span>
            <input
              type="password"
              id="password"
              className="infoupdater"
              name="password"
              onChange={(e) =>
                inputPasswordChangeHandler(e.target.id, e.target.value)
              }
            />
            <p className="inputHeader">Confirm Password</p>
            <input
              type="password"
              id="password"
              className="infoupdater"
              name="password"
              onChange={(e) =>
                inputPasswordChangeHandler(e.target.id, e.target.value)
              }
            />
            <span>
              <button className="saveButton" onClick={passwordHandler}>
                Save
              </button>
            </span>
          </span>
        )}
        <hr />
        <p className="inputHeader">Description</p>
        {!editDescription ? (
          <div className="currentinfo">
            <span>{description}</span>
            <span>
              <FiEdit2 className="editIcon" onClick={descriptionHandler} />
            </span>
          </div>
        ) : (
          <span>
            <textarea
              type="text"
              id="description"
              className="username"
              name="description"
              onChange={(e) =>
                inputDescriptionChangeHandler(e.target.id, e.target.value)
              }
            />
            <span>
              <button className="saveButton" onClick={descriptionHandler}>
                Save
              </button>
            </span>
          </span>
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
                onClick={() => deselectInventory(index)}
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
                onClick={() => deselectWishlist(index)}
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

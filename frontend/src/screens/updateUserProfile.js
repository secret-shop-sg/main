import React, { useState } from "react";
import Header from "../components/Shared/Header";
import "./styles/UpdateProfile.css";
import { FiEdit2 } from "react-icons/fi";

function UpdateUser() {
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [currentUsername, setNewUsername] = useState("current username");
  const [currentPassword, setNewPassword] = useState("bokuwasekkusudaisuki123");
  const [editDescription, setEditDescription] = useState(false);
  const [currentDescription, setNewDescription] = useState(
    "This is my descwiption. I seww stuwff fow the nintendo switch! OwO i wike games wike pokemon a wot! OwO smash bwos too ! OwO i hope to be abwe to buwy and seww games! OwO"
  );

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
    console.log(value);
    setNewUsername(value);
  };
  const inputPasswordChangeHandler = (inputIdentifier, value) => {
    console.log(value);
    setNewPassword(value);
  };
  const inputDescriptionChangeHandler = (inputIdentifier, value) => {
    console.log(value);
    setNewDescription(value);
  };
  return (
    <div>
      <Header />
      <div className="pictureUpdater">
        <img
          className="currentPicture"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kermit-the-frog-attends-the-2017-drama-league-benefit-gala-news-photo-1568466133.jpg"
        />
        <button className="changePicture">
          <FiEdit2 />
          Change Profile Picture
        </button>
      </div>
      <div className="userInformation">
        <p className="inputHeader">Username</p>
        {!editUsername ? (
          <div className="currentinfo">
            <span>{currentUsername}</span>
            <span> </span>
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
            <span>{currentPassword.substring(6)}</span>
            <span> </span>
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
        <hr></hr>
        <p className="inputHeader">Description</p>
        {!editDescription ? (
          <div className="currentinfo">
            <span>{currentDescription}</span>
            <span> </span>
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
      </div>
    </div>
  );
}

export default UpdateUser;

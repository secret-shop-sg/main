import React, { useState } from "react";
import "./Header.css";
<<<<<<< HEAD
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Login from "./test_files/login";
import Signup from "./test_files/signup";
import UserButtons from "./userButtons";
// header component
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [enteredText, setEnteredText] = useState('');
=======
import { FaSearch, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import Login from "./test_files/login";
import Signup from "./test_files/signup";
// header component
const Header = () => {
  const [enteredText, setEnteredText] = useState("");
>>>>>>> 314a3882ee08f0bdbe47dd67ad8b45e2038855cc
  // enteredText represents what the user typed the search bar

  const textChangeHandler = (event) => {
    // filters away symbols and changes spaces into -
    setEnteredText(
      event.target.value.replace(/(<([^>]+)>)=/gi, "").replace(" ", "-")
    );
  };

  const [loginForm, setLoginForm] = useState(false);

  const loginFormHandler = () => {
    setLoginForm(!loginForm);
  };

  const [signupForm, setSignupForm] = useState(false);

  const signupFormHandler = () => {
    setSignupForm(!signupForm);
  };

  const loginHeaderHandler = () => {
    setLoggedIn(true);
  }

  return (
    <header className="header">
      <div className="search-bar">
<<<<<<< HEAD
        <form className="form" onSubmit={event => event.preventDefault}>
=======
        <form className="form" onSubmit={(event) => event.preventDefault}>
>>>>>>> 314a3882ee08f0bdbe47dd67ad8b45e2038855cc
          <Link to="/">
            <div className="title">Link</div>
            {/* To be replaced by logo */}
          </Link>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search for games"
              onChange={textChangeHandler}
            />
<<<<<<< HEAD
            <Link to={{ pathname: "/search", search: `keyword=${enteredText}` }} style={{ backgroundImage: "none" }}>
=======
            <Link
              to={{
                pathname: "/search",
                search: `phrase=${enteredText}`,
              }}
              style={{ backgroundImage: "none" }}
            >
>>>>>>> 314a3882ee08f0bdbe47dd67ad8b45e2038855cc
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </Link>
          </div>
        </form>
<<<<<<< HEAD
        {!loggedIn ?
          <UserButtons
            signupForm={signupForm}
            signupFormHandler={signupFormHandler}
            loginForm={loginForm}
            loginFormHandler={loginFormHandler} /> :
          <span id="loggedInIcons">
            <span id="chat"><BsChatFill size={25} /></span>
            <span id="profile"><FaUserCircle size={25} /></span>
          </span>}
        {loginForm ? <Login closeButtonHandler={loginFormHandler} /> : null}
        {signupForm ? <Signup closeButtonHandler={signupFormHandler} /> : null}
      </div>
=======
        <div id="userbuttonholder">
          <span
            className="userButtons"
            id="login"
            onClick={() => {
              if (signupForm) {
                loginFormHandler();
                signupFormHandler();
              } else {
                loginFormHandler();
              }
            }}
          >
            <span>
              <FaUserAlt size={18} />
            </span>
            <span> </span>
            <span>Login</span>
          </span>
          <span
            id="signup"
            className="userButtons"
            onClick={() => {
              if (loginForm) {
                loginFormHandler();
                signupFormHandler();
              } else {
                signupFormHandler();
              }
            }}
          >
            <span>
              <FaUserPlus size={23} />
            </span>
            <span> </span>
            <span>Signup</span>
          </span>
        </div>
      </div>
      {loginForm ? <Login closeButtonHandler={loginFormHandler} /> : null}
      {signupForm ? <Signup closeButtonHandler={signupFormHandler} /> : null}
>>>>>>> 314a3882ee08f0bdbe47dd67ad8b45e2038855cc
    </header>
  );
};

export default Header;

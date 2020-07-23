import React, { useState } from "react";
import "./Header.css";
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
        <form className="form" onSubmit={event => event.preventDefault}>
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
            <Link
              to={{
                pathname: "/search",
                search: `phrase=${enteredText}`,
              }}
              style={{ backgroundImage: "none" }}
            >
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </Link>
          </div>
        </form>
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
    </header>
  );
};

export default Header;

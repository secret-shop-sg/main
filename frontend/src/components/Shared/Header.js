import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

// header component
const Header = () => {
  const [enteredText, setEnteredText] = useState("");
  // enteredText represents what the user typed the search bar

  // set the text in the search bar based on the URL of the page
  useEffect(() => {
    if (window.location.search) {
      const query = window.location.search;
      console.log("query", query);
      const startingIndex = query.indexOf("phrase=") + 7;
      console.log("startingIndex", startingIndex);
      if (startingIndex !== -1) {
        const phraseLength = query.substring(startingIndex).indexOf("&");
        if (phraseLength !== -1) {
          setEnteredText(
            query
              .substring(startingIndex, startingIndex + phraseLength)
              .replace(/-/g, " ")
          );
        } else
          setEnteredText(query.substring(startingIndex).replace(/-/g, " "));
      }
    }
  }, []);

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const [loginForm, setLoginForm] = useState(false);

  const loginFormHandler = () => {
    setLoginForm(!loginForm);
  };

  const [signupForm, setSignupForm] = useState(false);

  const signupFormHandler = () => {
    setSignupForm(!signupForm);
  };

  return (
    <header className="header">
      <div className="search-bar">
        <form className="form" onSubmit={(event) => event.preventDefault}>
          <Link to="/">
            <div className="title">Link</div>
            {/* To be replaced by logo */}
          </Link>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search for games"
              value={enteredText}
              onChange={textChangeHandler}
            />
            <Link
              to={`/search?phrase=${enteredText.replace(/ /g, "-")}`}
              style={{ backgroundImage: "none" }}
            >
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </Link>
          </div>
        </form>
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
      {loginForm ? (
        <Login
          closeButtonHandler={loginFormHandler}
          loginFormHandler={loginFormHandler}
        />
      ) : null}
      {signupForm ? (
        <Signup
          closeButtonHandler={signupFormHandler}
          signupFormHandler={signupFormHandler}
        />
      ) : null}
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import "./Header.css";
import { FaSearch, FaUserAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
// header component
const Header = () => {
  const [enteredText, setEnteredText] = useState("");
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

import React, { useState } from "react";
import "./Header.css";
import {
  FaSearch,
  FaUserPlus,
  FaUserCheck,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "./Login.css";
import { GrFormClose } from "react-icons/gr";

// header component
const Header = () => {
  const [enteredText, setEnteredText] = useState("");
  // enteredText represents what the user typed the search bar

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  //modal login and sign up page state and functions start here
  const [signin, setsignin] = useState(false);
  const [login, setlogin] = useState(false);

  function openmodalsign() {
    setsignin(true);
  }
  function closemodalsign() {
    setsignin(false);
  }
  function openmodallogin() {
    setlogin(true);
  }
  function closemodallogin() {
    setlogin(false);
  }
  //modal login and sign up page state and functions end here
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
              to={{ pathname: "/search", search: `phrase=${enteredText}` }}
              style={{ backgroundImage: "none" }}
            >
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </Link>
          </div>
        </form>

        {/* signup and login buttons */}
        <div id="userbuttonholder">
          <a
            className="userbuttons"
            id="signup"
            onClick={() => {
              openmodalsign();
              closemodallogin();
            }}
          >
            <FaUserPlus /> Signup
          </a>
          <a
            className="userbuttons"
            id="login"
            onClick={() => {
              openmodallogin();
              closemodalsign();
            }}
          >
            <FaUserCheck /> Login
          </a>
        </div>
      </div>

      {/* Modal pages start here */}
      <Modal open={login} onClose={closemodallogin}>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div>
              <button onClick={closemodallogin} className="closebutton">
                <GrFormClose size={32} />
              </button>
            </div>
            <div
              style={{ paddingTop: 10, paddingBottom: 10 }}
              className="fadeIn first"
            >
              <FaUserCircle size={61} />
            </div>
            <form>
              <input
                type="text"
                id="textthing"
                className="fadeIn second input"
                name="login"
                placeholder="username"
              />
              <input
                type="text"
                id="textthing"
                className="fadeIn third input"
                name="login"
                placeholder="password"
              />
              <input
                type="submit"
                className="fadeIn fourth input"
                value="Log In"
              />
            </form>

            <div id="formFooter">
              <a className="underlineHover" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={signin} onClose={closemodalsign}>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div>
              <button onClick={closemodalsign} className="closebutton">
                <GrFormClose size={32} />
              </button>
            </div>
            <div
              style={{ paddingTop: 10, paddingBottom: 10 }}
              className="fadeIn first"
            >
              <FaUserCircle size={61} />
            </div>
            <form>
              <input
                type="text"
                id="textthing"
                className="fadeIn second input"
                name="login"
                placeholder="username"
              />
              <input
                type="text"
                id="textthing"
                className="fadeIn third input"
                name="login"
                placeholder="email"
              />
              <input
                type="text"
                id="textthing"
                className="fadeIn fourth input"
                name="login"
                placeholder="password"
              />
              <input
                type="text"
                id="textthing"
                className="fadeIn fifth input"
                name="login"
                placeholder="confirm password"
              />
              <input
                type="submit"
                className="fadeIn sixth input"
                value="Create Account"
              />
            </form>
          </div>
        </div>
      </Modal>

      {/* Modal pages end here */}
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../constants/styles/Bootstrap.css";
import "./Headernew.css";
import { Modal } from "react-responsive-modal";
import Login from "./test_files/login";
import Signup from "./test_files/signin";

const Headernew = () => {
  const [enteredText, setEnteredText] = useState("");
  // enteredText represents what the user typed the search bar

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };
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
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-green">
        <div id="maindiv" className="container">
          <Link to="/">
            <a className="navbar-brand" href="#">
              LINK
            </a>
            {/* To be replaced by logo */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" id="searchbar">
              <li className="d-flex justify-content-center">
                <form
                  className="form"
                  onSubmit={(event) => event.preventDefault}
                >
                  <div className="search-box">
                    <span>
                      <input
                        type="text"
                        placeholder="Search for games"
                        name="searchitem"
                        id="searchitem"
                        onChange={textChangeHandler}
                      />
                      <Link
                        to={{
                          pathname: "/search",
                          search: `phrase=${enteredText}`,
                        }}
                        style={{ backgroundImage: "none" }}
                      >
                        <button type="submit" id="search-button">
                          <FaSearch />
                        </button>
                      </Link>
                    </span>
                  </div>
                </form>
              </li>
            </ul>
            <div
              id="userstuff"
              className="collapse navbar-collapse justify-content-end"
            >
              <ul className="nav navbar-nav" id="userstuff">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      openmodalsign();
                      closemodallogin();
                    }}
                  >
                    Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      openmodallogin();
                      closemodalsign();
                    }}
                  >
                    Login{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Modal open={login} close={!login} onClose={closemodallogin}>
        <Login />
      </Modal>
      <Modal open={signin} close={!signin} onClose={closemodalsign}>
        <Signup />
      </Modal>
    </div>
  );
};

export default Headernew;

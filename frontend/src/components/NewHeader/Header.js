import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";

import Login from "./Login";
import Signup from "./Signup";

const Header = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const history = useHistory();

  // to be changed to get from redux
  // const userID = "5f2faf5ad18a76073729f475";
  const userID = "";
  const username = "billy";

  // display sign in options based on login state
  const signinDisplay = () => {
    if (userID) {
      return (
        <Navbar.Text>
          <div className="header-name">Signed in as: {username}</div>
        </Navbar.Text>
      );
    } else {
      return (
        <ButtonGroup>
          <Button variant="outline-light" onClick={showLoginHandler}>
            Sign In
          </Button>
          <Button variant="outline-light" onClick={showSignupHandler}>
            Register
          </Button>
        </ButtonGroup>
      );
    }
  };

  // handler for when user types in search bar
  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  // execute search after search button is pressed
  const executeSearch = () => {
    history.push(`/search?phrase=${searchText.replace(/ /g, "-")}`);
  };

  // show or hide login
  const showLoginHandler = () => {
    setShowLogin(!showLogin);
  };

  // show or hide signup
  const showSignupHandler = () => {
    setShowSignup(!showSignup);
  };

  return (
    <Navbar bg="success" className="justify-content-between header-container">
      <Navbar.Brand href="/">
        <div className="header-name">Link</div>
      </Navbar.Brand>
      <Form inline>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={searchChangeHandler}
          />
          <InputGroup.Append>
            <Button
              variant="outline-light"
              onClick={executeSearch}
              type="submit"
            >
              <FaSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {signinDisplay()}
      <Login
        showLogin={showLogin}
        toggleLogin={showLoginHandler}
        toggleSignup={showSignupHandler}
      />
      <Signup
        showSignup={showSignup}
        toggleLogin={showLoginHandler}
        toggleSignup={showSignupHandler}
      />
    </Navbar>
  );
};

export default Header;

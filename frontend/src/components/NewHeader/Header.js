import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { Navbar, Form, FormControl, Button, InputGroup } from "react-bootstrap";

import Login from "./Login";
import Signup from "./Signup";

const Header = (props) => {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const history = useHistory();

  // to be changed to get from redux
  //const userID = "5f2faf5ad18a76073729f475";
  const userID = "";
  const username = "billy";

  // display sign in options based on login state
  const signinDisplay = () => {
    if (userID) {
      return <Navbar.Text>Signed in as: {username}</Navbar.Text>;
    } else {
      return (
        <Button variant="outline-success" onClick={showLoginHandler}>
          Sign In
        </Button>
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
    <Navbar bg="light" className="justify-content-between header-container">
      <Navbar.Brand href="/">Link</Navbar.Brand>
      <Form inline>
        <InputGroup size="lg">
          <FormControl
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={searchChangeHandler}
          />
          <InputGroup.Append>
            <Button variant="outline-success" onClick={executeSearch}>
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

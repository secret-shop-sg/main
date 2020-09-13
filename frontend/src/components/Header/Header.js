import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAPI } from "../../utils/useAPI";
import "./Header.css";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  InputGroup,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";

import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState(document.cookie.split("=")[1]);
  const [sendRequest] = useAPI();
  const history = useHistory();

  const logOut = async () => {
    const responseData = await sendRequest(
      "/api/user/logout",
      undefined,
      undefined,
      true
    );
    if (responseData) {
      if (responseData.loggedOut) {
        setUsername(null);
        history.push("/");
      }
    }
  };

  // display sign in options based on login state
  const signinDisplay = () => {
    const userIcon = () => {
      return <AiOutlineUser size="2em" />;
    };
    if (username) {
      return (
        <Navbar.Text>
          <div className="header-profile-icons">
            <div
              className="header-messages"
              onClick={() => history.push("/chat")}
            >
              <AiOutlineMessage size="2em" />
            </div>
            <DropdownButton
              title={<AiOutlineUser size="2em" />}
              variant="outline-light"
              alignRight
            >
              <Dropdown.Item onClick={() => history.push("/update")}>
                View profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
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
  const executeSearch = (event) => {
    event.preventDefault();
    if (searchText) {
      history.push(`/search?phrase=${searchText.replace(/ /g, "-")}`);
    } else {
      history.push("/search");
    }
    setSearchText("");
  };

  // show or hide login
  const showLoginHandler = () => {
    // Todo: what happens if user manually deletes the username cookie and not the httponly cookie??
    setUsername(document.cookie.split("=")[1]);
    setShowLogin(!showLogin);
  };

  // show or hide signup
  const showSignupHandler = () => {
    setUsername(document.cookie.split("=")[1]);
    setShowSignup(!showSignup);
  };

  return (
    <Navbar bg="dark" className="justify-content-between header-container">
      <Navbar.Brand href="/">
        <div className="header-name">Secret Shop</div>
      </Navbar.Brand>
      <Form inline onSubmit={executeSearch}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={searchChangeHandler}
          />
          <InputGroup.Append>
            <Button variant="outline-light" type="submit">
              <AiOutlineSearch />
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

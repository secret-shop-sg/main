import React, { useReducer } from "react";
import "./Login.css";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useAPI } from "../../utils/useAPI";

// reducer for login data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update field values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
      };
    default:
      return state;
  }
};

// login component
const Login = (props) => {
  const [sendRequest] = useAPI();
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      // TODO: check if handling password securely
    },
  });

  const inputChangeHandler = (event) => {
    dispatchForm({
      type: "UPDATE",
      input: event.target.name,
      value: event.target.value,
    });
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest(
      "/api/user/login",
      "POST",
      {
        // change the fields below to the actual fields
        username: formState.inputValues.username,
        password: formState.inputValues.password,
      },
      true
    );

    if (responseData) {
      if (!responseData.validCredentials) {
        // means either username or password is wrong
        alert("Authentication failed");
      } else {
        alert("Log in successful");
        props.toggleLogin();
      }
    }
  };

  const showSignupHandler = () => {
    props.toggleLogin();
    props.toggleSignup();
  };

  return (
    <Modal show={props.showLogin} onHide={props.toggleLogin}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="login-form" onSubmit={loginHandler}>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Username
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                name="username"
                required
                onChange={inputChangeHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                name="password"
                required
                onChange={inputChangeHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        New to Link?{" "}
        <a href="#" onClick={showSignupHandler}>
          Create an account
        </a>
        .
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleLogin}>
          Close
        </Button>
        <Button variant="outline-success" type="submit" form="login-form">
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;

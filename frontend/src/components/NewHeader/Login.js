import React from "react";
import "./Login.css";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// reducer for login data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update field values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // update field validity
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      // check if all fields are valid
      let formIsValid = true;
      for (const key in updatedValidities) {
        if (!updatedValidities[key]) {
          formIsValid = false;
          break;
        }
      }

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: formIsValid,
      };
    default:
      return state;
  }
};

// login component
const Login = (props) => {
  const loginHandler = () => {
    alert("logged in");
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
              <Form.Control type="text" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control type="password" required />
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

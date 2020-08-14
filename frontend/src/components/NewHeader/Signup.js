import React, { useReducer } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useAPI } from "../../utils/useAPI";

// reducer for signup data
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

// signup component
const Signup = (props) => {
  const [sendRequest] = useAPI();

  // use reducer for signup data
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      // TODO: check if handling password securely
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
      confirmedPassword: false,
    },
    formIsValid: false,
    inputAccepted: {
      username: false,
      email: false,
    },
  });

  // when input values are changed
  const inputChangeHandler = async (event) => {
    const value = event.target.value;
    const inputIdentifier = event.target.name;

    // field cannot be empty
    let isValid;
    if (value.length === 0) {
      isValid = false;
    } else {
      isValid = true;
    }

    // specific cases
    switch (inputIdentifier) {
      case "username":
        // check if username is already taken
        const responseData = await sendRequest(
          "/api/user/validate/username",
          "POST",
          {
            username: value,
          }
        );

        isValid = responseData.isValid;
    }

    // dispatch to reducer
    dispatchForm({
      type: "UPDATE",
      value: value,
      input: inputIdentifier,
      isValid: isValid,
    });
  };

  const showLoginHandler = () => {
    props.toggleSignup();
    props.toggleLogin();
  };
  return (
    <Modal show={props.showSignup} onHide={props.toggleSignup}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="register-form">
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Username
            </Form.Label>
            <Col>
              <Form.Control
                name="username"
                value={formState.inputValues.username}
                onChange={inputChangeHandler}
                isValid={
                  formState.inputValues.username &&
                  formState.inputValidities.username
                }
                isInvalid={
                  formState.inputValues.username &&
                  !formState.inputValidities.username
                }
                type="text"
                required
              />
              <Form.Control.Feedback type="valid">
                Username is available
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Username is unavailable
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Email
            </Form.Label>
            <Col>
              <Form.Control type="email" required />
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
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Confirm Password
            </Form.Label>
            <Col>
              <Form.Control type="password" required />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check
              required
              label="I agree to Link's terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Body>
        Already have account?{" "}
        <a href="#" onClick={showLoginHandler}>
          Login
        </a>
        .
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggleSignup}>
          Close
        </Button>
        <Button variant="outline-success" form="register-form" type="submit">
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;

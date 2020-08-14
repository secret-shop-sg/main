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
    case "CHECK_ACCEPTED":
      // update accepted
      const updatedAccepted = {
        ...state.inputAccepted,
        [action.input]: action.value,
      };

      // return updated state
      return {
        ...state,
        inputAccepted: updatedAccepted,
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
    let responseData;
    switch (inputIdentifier) {
      case "username":
        // check if username is already taken
        responseData = await sendRequest(
          "/api/user/validate/username",
          "POST",
          {
            username: value,
          }
        );

        // handle response
        if (responseData) {
          // dispatch results to reducer
          dispatchForm({
            type: "CHECK_ACCEPTED",
            value: responseData.isValid,
            input: inputIdentifier,
          });
        }
        break;
      case "email":
        //check for email format
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
          isValid = false;
        }

        //check if email is already taken
        responseData = await sendRequest("/api/user/validate/email", "POST", {
          email: value,
        });

        // handle response
        if (responseData) {
          // dispatch results to reducer
          dispatchForm({
            type: "CHECK_ACCEPTED",
            value: responseData.isValid,
            input: inputIdentifier,
          });
        }
        break;
      case "confirmedPassword":
        if (value !== formState.inputValues.password) {
          isValid = false;
        }
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
                  formState.inputValidities.username &&
                  formState.inputAccepted.username
                }
                isInvalid={
                  formState.inputValues.username &&
                  formState.inputValidities.username &&
                  !formState.inputAccepted.username
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
              <Form.Control
                name="email"
                type="email"
                required
                value={formState.inputValues.email}
                onChange={inputChangeHandler}
                isValid={
                  formState.inputValues.email &&
                  formState.inputValidities.email &&
                  formState.inputAccepted.email
                }
                isInvalid={
                  formState.inputValues.email &&
                  formState.inputValidities.email &&
                  !formState.inputAccepted.email
                }
              />
              <Form.Control.Feedback type="valid">
                Email is available
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Email is unavailable
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control
                name="password"
                type="password"
                value={formState.inputValues.password}
                onChange={inputChangeHandler}
                required
                isValid={
                  formState.inputValues.password &&
                  formState.inputValues.confirmedPassword &&
                  formState.inputValidities.confirmedPassword
                }
                isInvalid={
                  formState.inputValues.password &&
                  formState.inputValues.confirmedPassword &&
                  !formState.inputValidities.confirmedPassword
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="5">
              Confirm Password
            </Form.Label>
            <Col>
              <Form.Control
                name="confirmedPassword"
                type="password"
                value={formState.inputValues.confirmedPassword}
                onChange={inputChangeHandler}
                isValid={
                  formState.inputValues.password &&
                  formState.inputValues.confirmedPassword &&
                  formState.inputValidities.confirmedPassword
                }
                isInvalid={
                  formState.inputValues.password &&
                  formState.inputValues.confirmedPassword &&
                  !formState.inputValidities.confirmedPassword
                }
                required
              />
              <Form.Control.Feedback type="valid">
                Passwords match
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Passwords do not match
              </Form.Control.Feedback>
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

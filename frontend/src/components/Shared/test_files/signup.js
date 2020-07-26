import React, { useState, useCallback, useEffect, useReducer } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
import { useAPI } from "../../../utils/useAPI";

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

function Signup(props) {
  const [sendRequest, isLoading] = useAPI();
  const [isValid, setIsValid] = useState();
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
    // TODO: input validities
  });

  // input handler for all fields
  const inputChangeHandler = (inputIdentifier, value) => {
    // check if valid
    let isValid;
    if (value.length === 0) {
      isValid = false;
    } else {
      isValid = true;
    }
    // add more validity check - switch case?

    // dispatch to reducer
    dispatchForm({
      type: "UPDATE",
      value: value,
      input: inputIdentifier,
      isValid: isValid,
    });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.signupFormHandler();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const onBlurHandler = async (event) => {
    const value = event.target.value;
    const id = event.target.id;
    let responseData;

    // do some other validation for username below?
    if (id === "username") {
      responseData = await sendRequest(
        "/api/user/validate/username",
        "POST",
        JSON.stringify({
          username: value,
        })
      );
    } else if (id === "email") {
      responseData = await sendRequest(
        "/api/user/validate/email",
        "POST",
        JSON.stringify({
          email: value,
        })
      );
    }

    if (responseData) {
      setIsValid(responseData.isValid);
      console.log("isValid:", isValid);
    }
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <div className="closebutton" onClick={props.closeButtonHandler}>
          X
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
            id="username"
            className="fadeIn input textthing"
            name="login"
            placeholder="username"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            onBlur={onBlurHandler}
          />
          <input
            type="email"
            id="email"
            className="fadeIn input textthing"
            name="login"
            placeholder="email"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
            onBlur={onBlurHandler}
          />
          <input
            type="password"
            id="password"
            className="fadeIn input textthing"
            name="login"
            placeholder="password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="password"
            id="passwordConfirmed"
            className="fadeIn input textthing"
            name="login"
            placeholder="confirm password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="submit"
            className="fadeIn      input"
            value="Create Account"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;

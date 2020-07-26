import React, { useState, useCallback, useEffect, useReducer } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { useAPI } from "../../../utils/useAPI";
import { FaUserCircle } from "react-icons/fa";

// reducer for login data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update field values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      // TODO: validities

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
      };
    default:
      return state;
  }
};

function Login(props) {
  // use reducer for login data
  const [sendRequest, isLoading] = useAPI();
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      // TODO: check if handling password securely
    },
    // TODO: input validities
  });

  // input handler for both fields
  const inputChangeHandler = (inputIdentifier, value) => {
    // isValid for third parameter

    console.log(value);

    //dispatch to reducer
    dispatchForm({
      type: "UPDATE",
      value: value,
      input: inputIdentifier,
      // TODO: add validity here as another value
    });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.loginFormHandler();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest("/api/user/login", "POST", {
      // change the fields below to the actual fields
      username: "Billy",
      password: "test",
    });

    // responseData returns the user's userID
    if (responseData) {
      if (responseData.userID) {
        // Todo: Stored the userID in redux
        alert("Sign up successful");
      }
    }
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <div className="closebutton" onClick={props.closeButtonHandler}>
          X
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10 }} className="fadeIn">
          <FaUserCircle size={61} />
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            id="username"
            className="fadeIn input textthing"
            name="login"
            placeholder="username"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn input textthing"
            name="login"
            placeholder="password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input type="submit" className="fadeIn input" value="Log In" />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

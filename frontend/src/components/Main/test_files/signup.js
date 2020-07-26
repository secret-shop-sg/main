import React, { useState, useCallback, useEffect } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
function Signup(props) {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.signupFormHandler()
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return (
    <div className="wrapper">
      <div id="formContent">
        <div
          className="closebutton"
          onClick={props.closeButtonHandler}
        >
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
            id="textthing"
            className="fadeIn input"
            name="login"
            placeholder="username"
          />
          <input
            type="email"
            id="textthing"
            className="fadeIn input"
            name="login"
            placeholder="email"
          />
          <input
            type="password"
            id="textthing"
            className="fadeIn input"
            name="login"
            placeholder="password"
          />
          <input
            type="password"
            id="textthing"
            className="fadeIn input"
            name="login"
            placeholder="confirm password"
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

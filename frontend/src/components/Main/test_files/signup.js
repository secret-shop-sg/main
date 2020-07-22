import React, { useState, useCallback, useEffect } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
function Signup(props) {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.closeButtonHandler();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return (
    <div id="signupoverlay" className="wrapper">
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
            className="fadeIn second input"
            name="login"
            placeholder="username"
            required
          />
          <input
            type="email"
            id="textthing"
            className="fadeIn third input"
            name="login"
            placeholder="email"
            required
          />
          <input
            type="password"
            id="textthing"
            className="fadeIn fourth input"
            name="login"
            placeholder="password"
            required
          />
          <input
            type="password"
            id="textthing"
            className="fadeIn fifth input"
            name="login"
            placeholder="confirm password"
            required
          />
          <input
            type="submit"
            className="fadeIn sixth input"
            value="Create Account"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;

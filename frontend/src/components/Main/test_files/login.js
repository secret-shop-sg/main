import React, { useState, useCallback, useEffect } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
function Login(props) {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.loginFormHandler()
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
          className="fadeIn"
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
            type="password"
            id="textthing"
            className="fadeIn input"
            name="login"
            placeholder="password"
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

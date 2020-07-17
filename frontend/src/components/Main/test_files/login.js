import React, { useState } from "react";
import "../login.css";
import "../../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
function Login(props) {
  return (
    <div className="wrapper fadeInDown">
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
          />
          <input
            type="text"
            id="textthing"
            className="fadeIn third input"
            name="login"
            placeholder="password"
          />
          <input type="submit" className="fadeIn fourth input" value="Log In" />
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

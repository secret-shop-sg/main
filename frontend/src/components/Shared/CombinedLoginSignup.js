import React, { useState, useEffect } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import Login from "../Header/Login";
import Signup from "../Header/Signup";
import "./CombinedLoginSignup.css";
function CombinedLoginSignup(props) {
  const [loginActive, setLoginActive] = useState(props.loginActive);
  const [signupActive, setSignupActive] = useState(props.signupActive);
  const [showForms, setShowForms] = useState(true);
  function closeButtonHandler() {
    setShowForms(!showForms);
  }
  return (
    <div>
      {showForms ? (
        <div id="userform-overlay">
          <div className="button-holder">
            <div
              className={
                !loginActive ? "userbutton-default" : "userbutton-active"
              }
              onClick={() => {
                setSignupActive(false);
                setLoginActive(true);
              }}
            >
              Login
            </div>
            <div
              className={
                !signupActive ? "userbutton-default" : "userbutton-active"
              }
              onClick={() => {
                setSignupActive(true);
                setLoginActive(false);
              }}
            >
              Signup
            </div>
          </div>
          <div>
            {loginActive ? (
              <Login closeButtonHandler={closeButtonHandler} />
            ) : null}
          </div>
          <div>
            {signupActive ? (
              <Signup closeButtonHandler={closeButtonHandler} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CombinedLoginSignup;

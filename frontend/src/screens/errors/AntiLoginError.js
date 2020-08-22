import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import CombinedLoginSignup from "../../components/Shared/CombinedLoginSignup";
import "./styles/AntiLoginError.css";
function AntiLoginError() {
  const [loginActive, setLoginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);

  const loginActiveHandler = () => {
    setLoginActive(!loginActive);
  };

  const signupActiveHandler = () => {
    setSignupActive(!signupActive);
  };
  return (
    <div>
      {!loginActive && !signupActive ? (
        <div id="error-overlay">
          <div className="error-message">
            <AiOutlineWarning size={50} />
            <h3>Uh Oh</h3>
            <p>You have to be logged in to view this page.</p>
            <p>
              Please{" "}
              <a className="id-forms" onClick={loginActiveHandler}>
                log in
              </a>{" "}
              to your account
            </p>
            <p>or</p>
            <p>
              <a className="id-forms" onClick={signupActiveHandler}>
                Sign up
              </a>{" "}
              to create an account!
            </p>
          </div>
        </div>
      ) : (
        <CombinedLoginSignup
          loginActive={loginActive}
          signupActive={signupActive}
        />
      )}
    </div>
  );
}

export default AntiLoginError;

import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./styles/AntiLoginError.css";

function AntiLoginError() {
  return (
    <div>
      <div className="error-message">
        <AiOutlineWarning size={50} />
        <h3>Uh Oh</h3>
        <p>You have to be logged in to view this page.</p>
        <p>
          Click <Link to={"/"}>here</Link> to return to the home page!
        </p>
      </div>
    </div>
  );
}

export default AntiLoginError;

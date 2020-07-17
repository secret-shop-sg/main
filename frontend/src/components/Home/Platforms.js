import React from "react";
import "./Platforms.css";
import "../../constants/styles/Bootstrap.css";
const Platforms = (props) => {
  return (
    <div className="container">
      <button className="btn btn-light">Xbox</button>
      <button className="btn btn-light">Playstation</button>
      <button className="btn btn-light">Nintendo Switch</button>
    </div>
  );
};

export default Platforms;

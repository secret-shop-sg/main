import React from "react";
import "./Platforms.css";
import "../../constants/styles/Bootstrap.css";
import XboxLogo from "../../constants/icons/xbox.svg";
import SwitchLogo from "../../constants/icons/switch.svg";
import PlaystationLogo from "../../constants/icons/playstation.svg";

const Platforms = (props) => {
  return (
    <div className="container">
      <button className="btn btn-light icon-btn">
        <img src={XboxLogo} height="100" alt="Xbox" />
      </button>
      <button className="btn btn-light icon-btn">
        <img src={PlaystationLogo} height="100" alt="Playstation" />
      </button>
      <button className="btn btn-light icon-btn">
        <img src={SwitchLogo} alt="Switch" height="100" />
      </button>
    </div>
  );
};

export default Platforms;

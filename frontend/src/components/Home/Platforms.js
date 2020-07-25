import React from "react";
import { Link } from "react-router-dom";

import "./Platforms.css";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import XboxLogo from "../../constants/icons/xbox.svg";
import SwitchLogo from "../../constants/icons/switch.svg";
import PlaystationLogo from "../../constants/icons/playstation.svg";

const Platforms = (props) => {
  return (
    <ButtonGroup className="container">
      <Button variant="light" className="icon-btn">
        <Link to={{ pathname: "/search", search: `platform=Xbox-One` }}>
          <img src={XboxLogo} height="100" alt="Xbox" />
        </Link>
      </Button>
      <Button variant="light" className="icon-btn">
        <Link to={{ pathname: "/search", search: `platform=Playstation-4` }}>
          <img src={PlaystationLogo} height="100" alt="Playstation" />
        </Link>
      </Button>

      <Button variant="light" className="icon-btn">
        <Link to={{ pathname: "/search", search: `platform=Nintendo-Switch` }}>
          <img src={SwitchLogo} alt="Switch" height="100" />
        </Link>
      </Button>
    </ButtonGroup>
  );
};

export default Platforms;

import React from "react";
import { useHistory } from "react-router-dom";

import "./Platforms.css";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import XboxLogo from "../../constants/icons/xbox.svg";
import SwitchLogo from "../../constants/icons/switch.svg";
import PlaystationLogo from "../../constants/icons/playstation.svg";

const Platforms = (props) => {
  let history = useHistory();

  // functions for button press
  const onXboxPress = () => {
    history.push({ pathname: "/search", search: `platform=Xbox-One` });
  };

  const onPsPress = () => {
    history.push({ pathname: "/search", search: `platform=PlayStation-4` });
  };

  const onSwitchPress = () => {
    history.push({ pathname: "/search", search: `platform=Nintendo-Switch` });
  };

  return (
    <ButtonGroup className="container">
      <Button variant="light" className="icon-btn" onClick={onXboxPress}>
        <img src={XboxLogo} height="100" alt="Xbox" />
      </Button>
      <Button variant="light" className="icon-btn" onClick={onPsPress}>
        <img src={PlaystationLogo} height="100" alt="Playstation" />
      </Button>

      <Button variant="light" className="icon-btn" onClick={onSwitchPress}>
        <img src={SwitchLogo} alt="Switch" height="100" />
      </Button>
    </ButtonGroup>
  );
};

export default Platforms;

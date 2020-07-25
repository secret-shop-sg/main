import React from "react";
import { NavLink } from "react-router-dom";

import "./HomeListing.css";

// bootstrap components
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import XboxLogo from "../../constants/icons/xbox.svg";
import SwitchLogo from "../../constants/icons/switch.svg";
import PlaystationLogo from "../../constants/icons/playstation.svg";

const HomeListing = (props) => {
  const setPlatform = () => {
    switch (props.platform) {
      case "Nintendo Switch":
        return <img src={SwitchLogo} alt="Switch" height="40" />;
      case "Xbox One":
        return <img src={XboxLogo} height="40" alt="Xbox" />;
      case "PlayStation 4":
        return <img src={PlaystationLogo} height="40" alt="Playstation" />;
    }
  };

  return (
    <Card className="listing">
      <div>
        <NavLink
          to={{
            pathname: `/listing/${props.title}`,
            search: `${props.id}`,
          }}
        >
          <img className="game-img" alt="name of game" src={props.image} />
        </NavLink>
      </div>
      <Card.Body>
        <NavLink
          to={{
            pathname: `/listing/${props.title}`,
            search: `${props.id}`,
          }}
        >
          <Card.Title>{props.title}</Card.Title>
        </NavLink>
        <div className="badges">
          {props.isTrading && (
            <Badge variant="primary" className="type-indicator">
              Trade
            </Badge>
          )}
          {props.isRenting && (
            <Badge variant="secondary" className="type-indicator">
              Rent
            </Badge>
          )}
          {props.isSelling && (
            <Badge variant="success" className="type-indicator">
              Sell
            </Badge>
          )}
        </div>
        <div>{props.description}</div>
      </Card.Body>
      <div>{setPlatform()}</div>
    </Card>
  );
};

export default HomeListing;

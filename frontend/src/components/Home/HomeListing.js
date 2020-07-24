import React from "react";
import { NavLink } from "react-router-dom";

import "../../constants/styles/Bootstrap.css";
import "./HomeListing.css";

// bootstrap components
import Badge from "react-bootstrap/Badge";

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
    <div className="card listing">
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
      <div className="card-body">
        <NavLink
          to={{
            pathname: `/listing/${props.title}`,
            search: `${props.id}`,
          }}
        >
          <h2 className="card-title">{props.title}</h2>
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
      </div>
      <div>{setPlatform()}</div>
    </div>
  );
};

export default HomeListing;

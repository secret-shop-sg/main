import React from "react";
import { useHistory } from "react-router-dom";

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
      default:
        break;
    }
  };

  // history for router
  let history = useHistory();
  // go to specific listing
  const goToListing = () => {
    history.push({
      pathname: `/listing/${props.title}`,
      search: `${props.id}`,
    });
  };

  return (
    <Card className="listing">
      <div>
        <img
          className="game-img"
          alt="name of game"
          src={props.image}
          onClick={goToListing}
        />
      </div>
      <Card.Body>
        <Card.Title onClick={goToListing}>
          <div className="title">{props.title}</div>
        </Card.Title>
        <div className="badges">
          {props.isTrading && (
            <div>
              <Badge pill variant="primary" className="type-indicator">
                Trade
              </Badge>
              <span>&nbsp;</span>
            </div>
          )}
          {props.isRenting && (
            <div>
              <Badge pill variant="secondary" className="type-indicator">
                Rent
              </Badge>
              <span>&nbsp;</span>
            </div>
          )}
          {props.isSelling && (
            <div>
              <Badge pill variant="success" className="type-indicator">
                Sell
              </Badge>
            </div>
          )}
        </div>
        <Card.Text>
          <div>{props.description}</div>
        </Card.Text>
      </Card.Body>
      <div>{setPlatform()}</div>
    </Card>
  );
};

export default HomeListing;

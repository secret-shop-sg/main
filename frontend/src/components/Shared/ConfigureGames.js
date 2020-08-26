import React from "react";
import "./ConfigureGames.css";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";

const ConfigureGames = (props) => {
  return (
    <Modal show={props.show} onHide={props.toggle} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{props.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your {props.label}</p>
        <div className="d-flex">
          {props.selectedGames.map((game, index) => (
            <div key={index}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{game.title}</Tooltip>}
              >
                <img
                  src={BACKEND_ADDRESS + game.imageURL}
                  alt={game.title}
                  className="configure-games-img"
                />
              </OverlayTrigger>
            </div>
          ))}
        </div>
        <hr></hr>
        <p>Add Games</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggle}>
          Close
        </Button>
        <Button variant="outline-dark">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfigureGames;

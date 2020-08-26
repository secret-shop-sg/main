import React from "react";
import "./ConfigureGames.css";
import { Modal } from "react-bootstrap";

const ConfigureGames = (props) => {
  return (
    <Modal show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>{props.label}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default ConfigureGames;

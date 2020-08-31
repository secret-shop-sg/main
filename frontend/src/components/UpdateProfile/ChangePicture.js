import React from "react";
import { Modal, Button } from "react-bootstrap";

const ChangePicture = (props) => {
  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.toggle}>
          Close
        </Button>
        <Button variant="outline-dark" onClick={() => {}}>
          Change Picture
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePicture;

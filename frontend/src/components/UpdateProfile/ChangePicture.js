import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";

const ChangePicture = (props) => {
  const [picURL, setPicURL] = useState("");
  const chooseFileRef = useRef();

  useEffect(() => {
    setPicURL(props.currentPic);
    console.log(props.currentPic);
  }, [props]);

  const chooseFileHandler = () => {
    chooseFileRef.current.click();
  };

  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <Image src={BACKEND_ADDRESS + picURL} style={{ height: "40vh" }} />
          <Button variant="link" onClick={chooseFileHandler}>
            Choose file
          </Button>
          <input
            id="pic-upload"
            type="file"
            style={{ display: "none" }}
            accept=".jpg, .png, .jepg"
            ref={chooseFileRef}
          />
        </div>
      </Modal.Body>
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

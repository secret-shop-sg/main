import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";

const ChangePicture = (props) => {
  const [picURL, setPicURL] = useState("");
  const [previewURL, setPreviewURL] = useState();
  const chooseFileRef = useRef();

  useEffect(() => {
    setPicURL(props.currentPic);
    console.log(props.currentPic);
  }, [props]);

  // picking photos
  const chooseFileHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      console.log(event.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
    }
  };

  // click to choose
  const clickChooseHandler = () => {
    chooseFileRef.current.click();
  };

  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <Image
            src={previewURL ? previewURL : BACKEND_ADDRESS + picURL}
            style={{ height: "40vh" }}
          />
          <Button variant="link" onClick={clickChooseHandler}>
            Choose file
          </Button>
          <input
            id="pic-upload"
            type="file"
            style={{ display: "none" }}
            accept=".jpg, .png, .jepg"
            ref={chooseFileRef}
            onChange={chooseFileHandler}
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

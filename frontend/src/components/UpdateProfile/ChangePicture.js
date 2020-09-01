import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { useAPI } from "../../utils/useAPI";

const ChangePicture = (props) => {
  const [picURL, setPicURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const chooseFileRef = useRef();
  const [sendRequest] = useAPI();

  useEffect(() => {
    setPicURL(props.currentPic);
  }, [props]);

  // close handler (clear preview)
  const closeHandler = () => {
    setPreviewURL("");
    setSelectedFile(null);
    props.toggle();
  };

  // picking photos
  const chooseFileHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setSelectedFile(event.target.files[0]);
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

  // submit new photo
  const submitHandler = () => {
    if (selectedFile) {
      //update details async function
      console.log(selectedFile);

      sendRequest(
        `/api/user/update/details`,
        "PATCH",
        { username: props.username, profilePic: selectedFile },
        true,
        true
      ).then((responseData) => {
        if (responseData) {
          if (responseData.dataUpdated) {
            alert("Update successful");
          }
        }
      });
    }
  };

  return (
    <Modal show={props.show} onHide={closeHandler}>
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
        <Button variant="outline-danger" onClick={closeHandler}>
          Close
        </Button>
        <Button variant="outline-dark" onClick={submitHandler}>
          Change Picture
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePicture;

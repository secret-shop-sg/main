import React, { useRef, useState, useEffect } from "react";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { FiEdit2 } from "react-icons/fi";
import "./ImageUpload.css";
import { useAPI } from "../../utils/useAPI";

const ImageUpload = () => {
  // Todo: Block files that are too big from being uploaded
  const [previewURL, setPreviewURL] = useState();
  const filePickerRef = useRef();
  const [sendRequest] = useAPI();
  const [profilePic, setProfilePic] = useState("");

  // initalize image
  useEffect(() => {
    const getUserData = async () => {
      const responseData = await sendRequest(
        `/api/user/id`,
        undefined,
        undefined,
        true
      );
      if (responseData) {
        if (responseData.matchedUser) {
          setProfilePic(responseData.matchedUser.profilePicURL);
        }
      }
    };
    getUserData();
  }, [sendRequest]);

  // file is chosen
  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setProfilePic(event.target.files[0]);
      createPreview(event.target.files[0]);
    }

    //update details async function
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    sendRequest(`/api/user/update`, "PATCH", formData, true, true).then(
      (responseData) => {
        if (responseData) {
          if (responseData.dataUpdated) {
            alert("Update successful");
          }
        }
      }
    );
  };

  // creates a url for the image so it can be previewed
  const createPreview = (selectedImage) => {
    if (selectedImage) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(selectedImage);
    }
  };

  // clicking on the "Change Profile Picture" button triggers the hidden html file picker
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .png, .jepg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className="profile_picture_div">
        <div className="image_upload_preview">
          {/* Render user selected image if it exists*/}
          {previewURL && <img src={previewURL} alt="Preview" />}
          {/* If not, render user's existing picture if it is available*/}
          {!previewURL && profilePic && (
            <img src={BACKEND_ADDRESS + profilePic} alt="Profile pic" />
          )}
          {/* Else display instructions */}
          {!previewURL && !profilePic && <p>Please pick an image</p>}
        </div>
        <button className="change_picture_label" onClick={pickImageHandler}>
          <FiEdit2 /> Change Profile Picture
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;

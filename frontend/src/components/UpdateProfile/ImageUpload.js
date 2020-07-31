import React, { useRef, useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState();
  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setImage(event.target.files[0]);
    }
    // Todo: Add some way to get data back to parent
  };

  // creates a url for the image so it can be previewed
  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);

  // clicking on the "Change Profile Picture" tag triggers the hidden html file picker
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg, .png, .jepg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className="profile_picture_div">
        <div className="image_upload_preview">
          {previewURL && <img src={previewURL} alt="Image Preview" />}
          {
            !previewURL && (
              <p>Please pick an image</p>
            ) /* Todo: change to stock photo */
          }
        </div>
        <button className="change_picture_label" onClick={pickImageHandler}>
          <FiEdit2 /> Change Profile Picture
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;

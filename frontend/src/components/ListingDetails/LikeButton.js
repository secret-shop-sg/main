import React, { useState } from "react";
import "./LikeButton.css";
import { BsChatFill, BsHeartFill } from "react-icons/bs";
import { useAPI } from "../../utils/useAPI";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [sendRequest] = useAPI();

  const likeHandler = async (event) => {
    event.preventDefault();
    const listingID = props.id;
    setLiked(!liked);

    const responseData = await sendRequest(
      "/api/user/bookmark",
      "POST",
      { bookmark: listingID, newBookmark: !liked },
      true
    );
    if (responseData) {
      console.log(responseData);
    }

    // error catcher to change back
  };

  return (
    <button onClick={likeHandler} className={liked ? "btn-liked" : "btn-like"}>
      <BsHeartFill />
      <span> </span>Like!
    </button>
  );
};

export default LikeButton;

import React from "react";
import "./ChatSummary.css";
import { BACKEND_ADDRESS } from "../../constants/Details";

const ChatSummary = (props) => {
  const { recipient, latestMessage } = props.chatData;

  const clickChatHandler = () => {
    const recipientID = recipient._id;
    props.onChatSelect(recipientID);
  };

  return (
    <div className="chat-summary-box" onClick={clickChatHandler}>
      <img
        className="chat-summary-img"
        src={BACKEND_ADDRESS + recipient.profilePicURL}
        width="20%"
      />
      <div className="chat-summary-details">
        <div className="recipient-label">{recipient.username}</div>
        <div className="message-preview">
          {latestMessage.messages[0].content}
        </div>
      </div>
    </div>
  );
};

export default ChatSummary;

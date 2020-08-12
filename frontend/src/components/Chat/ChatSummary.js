import React from "react";
import "./ChatSummary.css";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { Button } from "react-bootstrap";

const ChatSummary = (props) => {
  const { recipient, latestMessage } = props.chatData;

  const clickChatHandler = () => {
    const recipientID = recipient._id;
    const name = recipient.username;
    props.onChatSelect(recipientID, name);
  };

  return (
    <Button onClick={clickChatHandler} variant="light">
      <div className="chat-summary-box">
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
    </Button>
  );
};

export default ChatSummary;

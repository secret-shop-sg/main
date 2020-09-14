import React from "react";
import "./ChatSummary.css";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { Button } from "react-bootstrap";

const ChatSummary = (props) => {
  const { recipientID, chat } = props.chatData;

  const clickChatHandler = () => {
    const recipientID = props.chatData.recipientID._id;
    const name = props.chatData.recipientID._id;
    props.onChatSelect(recipientID, name);
  };

  // cuts off last message if too long
  const previewMessage = () => {
    const message = chat.latestMessage.messages.content;
    return message;
  };

  return (
    <Button onClick={clickChatHandler} variant="light">
      <div className="chat-summary-box">
        <img
          className="chat-summary-img"
          src={BACKEND_ADDRESS + recipientID.profilePicURL}
          width="20%"
          alt="recipient profile"
        />
        <div className="chat-summary-details">
          <div className="recipient-label">{recipientID._id}</div>
          <div className="message-preview">{previewMessage()}</div>
        </div>
      </div>
    </Button>
  );
};

export default ChatSummary;

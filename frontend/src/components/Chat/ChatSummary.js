import React from "react";
import "./ChatSummary.css";
import { BACKEND_ADDRESS } from "../../constants/Details";
import { Button } from "react-bootstrap";

const ChatSummary = (props) => {
  const {
    recipientID,
    latestMessage,
    recipient,
    recipientProfilePic,
  } = props.chatData;

  const clickChatHandler = () => {
    //const recipientID = props.chatData.recipientID;
    //const name = props.chatData.recipient;
    props.onChatSelect(recipientID, recipient);
  };

  // cuts off last message if too long
  const previewMessage = () => {
    const message = latestMessage.content;
    return message;
  };

  return (
    <Button onClick={clickChatHandler} variant="light">
      <div className="chat-summary-box">
        <img
          className="chat-summary-img"
          src={BACKEND_ADDRESS + recipientProfilePic}
          width="20%"
          alt="recipient profile"
        />
        <div className="chat-summary-details">
          <div className="recipient-label">{recipient}</div>
          <div className="message-preview">{previewMessage()}</div>
        </div>
      </div>
    </Button>
  );
};

export default ChatSummary;

import React from "react";
import "./ChatMessages.css";

const ChatMessages = (props) => {
  const recipientID = props.recipientID;

  if (!recipientID) {
    return <div className="chat-messages-display">No chat selected</div>;
  }

  return <div className="chat-messages-display">{props.recipientID}</div>;
};

export default ChatMessages;

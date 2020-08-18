import React, { useState } from "react";
import "./styles/Chat.css";
import Header from "../components/Header/Header";
import ChatOverview from "../components/Chat/ChatOverview";
import ChatMessages from "../components/Chat/ChatMessages";

const Chat = () => {
  const [selectedChatRecipient, setSelectedChatRecipient] = useState("");
  const [selectedChatRecipientName, setSelectedChatRecipientName] = useState(
    ""
  );

  // handler for selecting chat
  const onChatSelect = (recipient, name) => {
    setSelectedChatRecipient(recipient);
    setSelectedChatRecipientName(name);
  };

  return (
    <div className="chat-screen">
      <Header />
      <div className="chat-interface">
        <ChatOverview onChatSelect={onChatSelect} />
        <div className="messages">
          <ChatMessages
            userData={{
              recipientID: selectedChatRecipient,
              recipientName: selectedChatRecipientName,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

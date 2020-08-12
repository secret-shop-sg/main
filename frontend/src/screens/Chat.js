import React, { useState, useCallback } from "react";
import "./styles/Chat.css";
import { useAPI } from "../utils/useAPI";
import Header from "../components/Shared/Header";
import ChatOverview from "../components/Chat/ChatOverview";
import ChatMessages from "../components/Chat/ChatMessages";

const Chat = (props) => {
  const [sendRequest] = useAPI();
  const [selectedChatRecipient, setSelectedChatRecipient] = useState("");
  const [selectedChatRecipientName, setSelectedChatRecipientName] = useState(
    ""
  );
  const [selectedChatRecipientImg, setSelectedChatRecipientImg] = useState("");
  // use dummy userID for now
  const userID = "5f2faf5ad18a76073729f475";

  // handler for selecting chat
  const onChatSelect = useCallback((recipient, name, image) => {
    setSelectedChatRecipient(recipient);
    setSelectedChatRecipientName(name);
    setSelectedChatRecipientImg(image);
  });

  return (
    <div className="chat-screen">
      <Header />
      <div className="chat-interface">
        <ChatOverview userID={userID} onChatSelect={onChatSelect} />
        <div className="messages">
          <ChatMessages
            userData={{
              userID,
              recipientID: selectedChatRecipient,
              recipientName: selectedChatRecipientName,
              recipientImage: selectedChatRecipientImg,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

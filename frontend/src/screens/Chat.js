import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Chat.css";
import Header from "../components/Header/Header";
import ChatOverview from "../components/Chat/ChatOverview";
import SocketContext from "../utils/socketContext";
import ChatMessages from "../components/Chat/ChatMessages";
import io from "socket.io-client";
import { BACKEND_ADDRESS } from "../constants/Details";

const Chat = () => {
  const socket = io(BACKEND_ADDRESS);
  const history = useHistory();
  const [selectedChatRecipient, setSelectedChatRecipient] = useState("");
  const [selectedChatRecipientName, setSelectedChatRecipientName] = useState(
    ""
  );

  socket.on("loggedIn", (loggedIn) => {
    // if loggedIn == true, render page
    if (!loggedIn) history.push("/login=false");
  });

  socket.on("Error", () => {
    const error = new Error("Server Error");
    error.status = 503;
    history.replace("/error/500", error);
  });
  // handler for selecting chat
  const onChatSelect = (recipient, name) => {
    setSelectedChatRecipient(recipient);
    setSelectedChatRecipientName(name);
  };

  // handler for scrolling through messages
  const onMessagesScroll = (e) => {
    // if reached top
    if (e.target.scrollTop === 0) {
      alert("top");
    }
  };

  return (
    <div className="chat-screen">
      <Header />
      <div className="chat-interface">
        <SocketContext.Provider value={socket}>
          <ChatOverview onChatSelect={onChatSelect} />
          <div className="messages" onScroll={onMessagesScroll}>
            <ChatMessages
              userData={{
                recipientID: selectedChatRecipient,
                recipientName: selectedChatRecipientName,
              }}
            />
          </div>
        </SocketContext.Provider>
      </div>
    </div>
  );
};

export default Chat;

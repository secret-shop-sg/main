import React, { useState } from "react";
import "./ChatOverview.css";
import SocketContext from "../../utils/socketContext";
import ChatSummary from "./ChatSummary";
import { ButtonGroup } from "react-bootstrap";

const ChatOverviewWithSocket = (props) => {
  const [chats, setChats] = useState([]);
  const socket = props.socket;

  socket.on("setChatOverview", (data) => {
    if (data) {
      console.log(data);
      setChats(data);
    }
  });

  socket.on("messageReceived", (messageData) => console.log(messageData));

  return (
    <div className="chats">
      <div className="chat-overview-label">Messages</div>
      <div className="chat-summaries">
        <ButtonGroup vertical>
          {chats.map((chatData) => (
            <ChatSummary
              chatData={chatData}
              onChatSelect={props.onChatSelect}
              key={chatData.recipientID}
            />
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

const ChatOverview = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatOverviewWithSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatOverview;

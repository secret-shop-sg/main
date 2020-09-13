import React, { useState, useEffect, useRef } from "react";
import "./ChatMessages.css";
import { BACKEND_ADDRESS } from "../../constants/Details";
import SocketContext from "../../utils/socketContext";
import { useAPI } from "../../utils/useAPI";
import { Spinner, Alert, Container } from "react-bootstrap";
import MessageSend from "./MessageSend";

const ChatMessagesWithSocket = (props) => {
  //const [sendRequest] = useAPI();
  const socket = props.socket;
  const [chatData, setChatData] = useState();
  const [chatIsLoading, setChatIsLoading] = useState(false);

  // ref for latest message
  const latestMessage = useRef(null);

  // unpack user data
  const { recipientID, recipientName } = props.userData;

  // this is so that we can rerender the chat messages after a message is sent
  const [sentMessage, setSentMessage] = useState("");

  // function to display contents of chat message
  const displayChatMessage = (message) => {
    if (message.sentBySelf) {
      return (
        <div className="message-box message-by-you">
          <div>{message.content}</div>
          <img
            className="chat-message-img"
            src={BACKEND_ADDRESS + chatData.userProfilePic}
          />
        </div>
      );
    } else {
      return (
        <div className="message-box message-by-rec">
          <img
            className="chat-message-img"
            src={BACKEND_ADDRESS + chatData.recipientProfilePic}
          />
          <div className={message.read ? "" : "unread-chat-msgs"}>
            {message.content}
          </div>
        </div>
      );
    }
  };
  /*
  // get chat data if user/recipient changes or on page load
  useEffect(() => {
    if (recipientID) {
      setChatIsLoading(true);
      
      sendRequest(
        "/api/chat/specific",
        "PATCH",
        {
          recipientID,
        },
        true
      ).then((responseData) => {
        setChatData(responseData.chatData);
        setChatIsLoading(false);

        // scroll to bottom
        latestMessage.current.scrollIntoView({ behavior: "auto" });
      });
    

    }
  }, [recipientID, sentMessage]); */

  socket.emit("getChatSpecific", {
    recipientID: "5f2ffb54eea9c2180a732afa",
    page: 1,
  });

  socket.on("chatSpecific", (data) => {
    console.log("printed from ChatSpecific.js", data);
  });

  // return no chat selected if no recipientID
  if (!chatData) {
    return <div className="chat-message-centered">No chat selected</div>;
  }

  if (chatIsLoading) {
    return (
      <div className="chat-message-centered">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="chat-messages-display">
      <div className="chat-messages-label">{recipientName}</div>
      <div className="chat-messages-log">
        <div className="chat-message-log-flexbox">
          <div ref={latestMessage}></div>
          {chatData.messages.map(displayChatMessage)}
        </div>
      </div>
      <div className="chat-message-input">
        <MessageSend
          recipientID={recipientID}
          setSentMessage={setSentMessage}
        />
      </div>
    </div>
  );
};

const ChatMessages = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatMessagesWithSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatMessages;

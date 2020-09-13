import React, { useState, useEffect } from "react";
import { useAPI } from "../../utils/useAPI";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import SocketContext from "../../utils/socketContext";

const MessageSendWithSocket = (props) => {
  const recipientID = props.recipientID;
  const socket = props.socket;
  const [messageContent, setMessageContent] = useState("");
  const [sendRequest] = useAPI();

  const onMessageChangeHandler = (event) => {
    setMessageContent(event.target.value);
  };

  /*const sendMessageHandler = () => {
    sendRequest(
      "/api/chat/add",
      "POST",
      {
        recipientID,
        content: messageContent,
      },
      true
    ).then((response) => {
      setMessageContent("");
      //re render parent
      props.setSentMessage(messageContent);
    });
  }; */

  const sendMessageHandler = () => {
    props.socket.emit("newMessage", messageContent);
  };

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      sendMessageHandler();
    }
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="Message"
        value={messageContent}
        onChange={onMessageChangeHandler}
        onKeyDown={onKeyDown}
        ref={(input) => input && input.focus()}
      />
      <InputGroup.Append>
        <Button variant="secondary" onClick={sendMessageHandler} type="submit">
          Send
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

const MessageSend = (props) => (
  <SocketContext.Consumer>
    {(socket) => <MessageSendWithSocket {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default MessageSend;

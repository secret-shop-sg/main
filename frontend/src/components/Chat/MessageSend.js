import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import SocketContext from "../../utils/socketContext";

const MessageSendWithSocket = (props) => {
  const recipientID = props.recipientID;
  const [messageContent, setMessageContent] = useState("");

  const onMessageChangeHandler = (event) => {
    setMessageContent(event.target.value);
  };

  const sendMessageHandler = () => {
    props.socket.emit("newMessage", { messageContent, recipientID });
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

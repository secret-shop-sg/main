import React, { useState, useEffect, useRef } from "react";
import { useAPI } from "../../utils/useAPI";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

const MessageSend = (props) => {
  const senderID = props.userID;
  const recipientID = props.recipientID;
  const [messageContent, setMessageContent] = useState("");
  const [sendRequest] = useAPI();

  const onMessageChangeHandler = (event) => {
    setMessageContent(event.target.value);
  };

  const sendMessageHandler = () => {
    console.log("sending message");
    sendRequest("/api/chat/add", "POST", {
      senderID,
      recipientID,
      content: messageContent,
    }).then((response) => {
      setMessageContent("");
      //re render parent
      props.setSentMessage(messageContent);
    });
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

export default MessageSend;

import React, { useState } from "react";
import { useAPI } from "../../utils/useAPI";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const MessageSend = (props) => {
  const senderID = props.userID;
  const recipientID = props.recipientID;
  const [messageContent, setMessageContent] = useState("");
  const [sendRequest] = useAPI();

  const onMessageChangeHandler = (event) => {
    setMessageContent(event.target.value);
  };

  const sendMessageHandler = async () => {
    await sendRequest("/api/chat/add", "POST", {
      senderID,
      recipientID,
      content: messageContent,
    });
    setMessageContent("");

    //re render parent
    props.setSentMessage(messageContent);
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="Message"
        value={messageContent}
        onChange={onMessageChangeHandler}
      />
      <InputGroup.Append>
        <Button variant="secondary" onClick={sendMessageHandler}>
          Send
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default MessageSend;

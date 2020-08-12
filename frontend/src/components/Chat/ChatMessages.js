import React, { useState, useEffect } from "react";
import "./ChatMessages.css";
import { useAPI } from "../../utils/useAPI";

const ChatMessages = (props) => {
  const [sendRequest] = useAPI();
  const [chatData, setChatData] = useState();
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const userID = props.userID;
  const recipientID = props.recipientID;
  console.log(chatData);

  // function to display contents of chat message
  const displayChatMessage = (message) => {
    let name;
    if (message.sentBySelf) {
      name = "You";
    } else {
      name = recipientID;
    }

    return (
      <div>
        {name}: {message.content}
      </div>
    );
  };

  // get chat data if user/recipient changes or on page load
  useEffect(() => {
    if (userID && recipientID) {
      setChatIsLoading(true);
      sendRequest("/api/chat/specific", "PATCH", { userID, recipientID }).then(
        (responseData) => {
          setChatData(responseData.matchedChatLog);
        }
      );
      setChatIsLoading(false);
    }
  }, [userID, recipientID]);

  // return no chat selected if no recipientID
  if (!chatData) {
    return <div className="chat-messages-display">No chat selected</div>;
  }

  if (chatIsLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="chat-messages-display">
      <div className="chat-messages-label">{props.recipientUsername}</div>
      <div className="chat-messages-log">
        {chatData.messages.map(displayChatMessage)}
      </div>
    </div>
  );
};

export default ChatMessages;

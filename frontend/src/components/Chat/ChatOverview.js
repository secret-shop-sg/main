import React, { useEffect, useState } from "react";
import "./ChatOverview.css";
import { useAPI } from "../../utils/useAPI";
import ChatSummary from "./ChatSummary";

const ChatOverview = (props) => {
  const [sendRequest] = useAPI();
  const [chats, setChats] = useState([]);
  const userID = props.userID;

  useEffect(() => {
    sendRequest(`/api/chat/overview/${userID}`).then((response) => {
      setChats(response.matchedChats);
    });
  }, [userID]);

  return (
    <div className="chats">
      {chats.map((chatData) => (
        <ChatSummary chatData={chatData} onChatSelect={props.onChatSelect} />
      ))}
    </div>
  );
};

export default ChatOverview;

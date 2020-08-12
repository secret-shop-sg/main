import React, { useEffect, useState } from "react";
import "./ChatOverview.css";
import { useAPI } from "../../utils/useAPI";
import ChatSummary from "./ChatSummary";
import { ButtonGroup } from "react-bootstrap";

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
      <div className="chat-overview-label">Messages</div>
      <ButtonGroup vertical>
        {chats.map((chatData) => (
          <ChatSummary chatData={chatData} onChatSelect={props.onChatSelect} />
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ChatOverview;

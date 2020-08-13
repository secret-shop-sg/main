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
  }, [userID, sendRequest]);

  return (
    <div className="chats">
      <div className="chat-overview-label">Messages</div>
      <div className="chat-summaries">
        <ButtonGroup vertical>
          {chats.map((chatData) => (
            <ChatSummary
              chatData={chatData}
              onChatSelect={props.onChatSelect}
              key={chatData.recipient._id}
            />
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ChatOverview;

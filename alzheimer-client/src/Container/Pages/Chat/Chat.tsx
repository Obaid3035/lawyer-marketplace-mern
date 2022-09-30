import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Conversation from "./Conversation/Conversation";
import ChatBox from "./ChatBox/ChatBox";
import Search from "./Conversation/Search/Search";
import { IUser } from "../../../interfaces";
import ChatApi from "../../../api/chat";
import useSelectedChat from "../../../hooks/useSelectedChat";

export interface IConversation {
  _id: string;
  members: IUser[];
  last_message: string;
  createdAt: string;
  updatedAt: string;
}

const Chat = () => {
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState<IConversation[]>([]);
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const { selectedChat } = useSelectedChat();

  useEffect(() => {
    setIsConversationLoading(true);
    ChatApi.getConversations()
      .then((res) => {
        setIsConversationLoading(false);
        setConversation(res.data);
      })
      .catch(() => {
        setIsConversationLoading(false);
      });
  }, []);

  return (
    <Row className="px-3">
      <Col md={4}>
        <div className="conversation-container">
          <Search
            search={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          {/*<p>Conversation</p>*/}
          <Conversation
            isLoading={isConversationLoading}
            conversations={conversation}
          />
        </div>
      </Col>
      <Col md={8}>
        {selectedChat ? (
          <ChatBox selectedChat={selectedChat} />
        ) : (
          <div
            className={"d-flex justify-content-center align-items-center h-100"}
          >
            <p className={"text-muted"}>Please select a conversation</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Chat;

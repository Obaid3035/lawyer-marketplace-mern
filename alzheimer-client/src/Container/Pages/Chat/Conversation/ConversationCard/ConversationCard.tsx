import React from "react";
import "./ConversationCard.scss";
import { IConversation } from "../../Chat";
import Avatar from "../../../../../Assets/avatar.png";
import useSelectedChat from "../../../../../hooks/useSelectedChat";
import useAuth from "../../../../../hooks/useAuth";
import { timeAgo } from "../../../../../util/helper";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../../../hooks/useSocket";

export interface IConversationCard {
  info: IConversation;
}

const ConversationCard: React.FC<IConversationCard> = ({ info }) => {
  const { selectedChat, setSelectedChat } = useSelectedChat();
  const navigation = useNavigate();
  const { auth } = useAuth();
  const {socket} = useSocket()

  const getSelectedChatClass = () => {
    if (selectedChat) {
      if (selectedChat._id === info._id) {
        return "-selected";
      }
    }
    return "";
  };

  return (
    <div
      className={`card-container ${getSelectedChatClass()}`}
      onClick={() => {
        setSelectedChat((chat: IConversation) => {
          if (chat) socket?.leaveRoom(chat._id)
          return info
        });
      }}
    >
      <img
        className="profile-pic"
        src={
          info.members[0]._id === auth?._id
            ? info.members[1].profilePicture
              ? info.members[1].profilePicture.url
              : Avatar
            : info.members[0].profilePicture
            ? info.members[0].profilePicture.url
            : Avatar
        }
        alt={"avatar"}
      />
      <div className="convo">
        <div className="convo-desc">
          <h6 className="convo-desc-name">
            {info.members[0]._id === auth?._id
              ? info.members[1].name
              : info.members[0].name}
          </h6>
        </div>
        <span className="convo-time">{timeAgo(info.updatedAt)}</span>
      </div>
    </div>
  );
};

export default ConversationCard;

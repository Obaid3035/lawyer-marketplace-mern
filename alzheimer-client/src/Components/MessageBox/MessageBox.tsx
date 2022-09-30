import React from "react";
import "./MessageBox.scss";
import { useNavigate } from "react-router-dom";
import Avatar from "../../Assets/avatar.png";
import { IConversation } from "../../Container/Pages/Chat/Chat";
import useAuth from "../../hooks/useAuth";
import { timeAgo } from "../../util/helper";
import useSelectedChat from "../../hooks/useSelectedChat";
import useSocket from "../../hooks/useSocket";

const MessageBox = (props: {
  extraClasses: string;
  conversation: IConversation[];
}) => {
  const navigation = useNavigate();
  const { setSelectedChat } = useSelectedChat();
  const { socket } = useSocket()
  const { auth } = useAuth();

  return (
    <div className={`message_box ${props.extraClasses}`}>
      <div className={"message_box_top"}>
        <h4>Messages</h4>
        <div>
          <h4>
            Chat
            {/*<span className='badge'>1</span>*/}
          </h4>
        </div>
      </div>
      {props.conversation.length > 0 ? (
        props.conversation.map((conversation) => {
          const user = conversation.members.find((user) => {
            if (user._id !== auth?._id) {
              return user;
            }
          });
          return (
            <div
              className={"message_box_item"}
              onClick={() => {
                setSelectedChat((chat: IConversation) => {
                  if (chat) socket?.leaveRoom(chat._id)
                  return conversation
                });
                navigation("/chat");
              }}
            >
              <div className={"message_box_message"}>
                <img
                  width={60}
                  alt={"avatar"}
                  src={user?.profilePicture ? user.profilePicture.url : Avatar}
                  className={"img-fluid"}
                />
                <div>
                  <h5>{user?.name}</h5>
                  <p>{conversation.last_message}</p>
                </div>
              </div>
              <p>{timeAgo(conversation.updatedAt)}</p>
            </div>
          );
        })
      ) : (
        <p className={'text-center'}>No Conversation Found</p>
      )}
    </div>
  );
};

export default MessageBox;

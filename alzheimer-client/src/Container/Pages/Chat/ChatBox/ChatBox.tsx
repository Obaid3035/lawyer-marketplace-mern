import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../../Assets/avatar.png";
import { IoMdSend } from "react-icons/io";
import "./ChatBox.scss";
import { IConversation } from "../Chat";
import { IUser } from "../../../../interfaces";
import ChatApi from "../../../../api/chat";
import useAuth from "../../../../hooks/useAuth";
import useSocket from "../../../../hooks/useSocket";
import Lottie from "lottie-react";
import animationData from "../../../../animation/typing.json";
import useNotification, {
  INotification,
} from "../../../../hooks/useNotification";

export interface IChatBox {
  selectedChat: IConversation;
}

export interface IMessage {
  _id: string;
  text: string;
  conversation: IConversation;
  sender: IUser;
}

const ReceiveMsg: React.FC<any> = ({ msg }) => {
  return <div className="msg-other">{msg}</div>;
};
const SendMsg: React.FC<any> = ({ msg }) => {
  return <div className="msg-me">{msg}</div>;
};

const ChatBox: React.FC<IChatBox> = ({ selectedChat }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { setNotification } = useNotification();
  const { auth } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);
  const [typingMsg, setTypingMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  const messagesEndRef = useRef(document.createElement("div"));

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {

    socket?.onReceiveStartTypingMessage(() => {
      setIsTyping(true)
    });
    socket?.onReceiveStopTypingMessage(() => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (selectedChat.members[0]._id === auth?._id) {
      setUser(selectedChat.members[1]);
    } else {
      setUser(selectedChat.members[0]);
    }
    ChatApi.getMessages(selectedChat._id).then((res) => {
      setMessages([...res.data]);

      ChatApi.getNotifications().then((res) => {
        setNotification(res.data);
      });
    });
    socket?.joinRoom(selectedChat._id)
  }, [selectedChat]);

  useEffect(() => {
    const handler = (chatMessage: IMessage) => {
      setMessages((messages) => [...messages, chatMessage]);
      setNotification((notification: INotification) => {
        return {
          conversation: notification.conversation.map((conversation) => {
            // @ts-ignore
            if (conversation._id === chatMessage.conversation) {
              return {
                ...conversation,
                updatedAt: new Date(),
                last_message: chatMessage.text,
              };
            }
            return conversation;
          }),
          allUnseenMessages: notification?.allUnseenMessages!,
        };
      });
      ChatApi.updateMessage(chatMessage._id).then(() => {});
    };
    socket?.onReceiveMessage(handler);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (event: any) => {
    event.preventDefault();
    const msg: any = {
      text: typingMsg,
      sender: {
        ...auth,
      },
    };
    socket?.onSendStopTypingMessage(selectedChat._id);
    setMessages([...messages, msg]);
    setTypingMsg("");
    const { data } = await ChatApi.createMessage(selectedChat?._id, typingMsg);
    socket?.sendMessage(data, selectedChat._id!, user?._id!);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingMsg(e.target.value);
    if (!typing) {
      setTyping(true);
      console.log("Typing to: ", selectedChat?._id!)
      socket?.onSendStartTypingMessage(selectedChat?._id!);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket?.onSendStopTypingMessage(selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className={"chat"}>
      <div className="chat-header">
        <img
          className="chat-header-dp"
          src={
            user ? (user.profilePicture ? user.profilePicture.url : Avatar) : ""
          }
          alt="avatar"
        />
        <div className="header-info">
          <h5 className="header-info-title">{user && user.name}</h5>
        </div>
      </div>

      <div className="chat-msg">
        {messages.length > 0 &&
          messages.map((msg, index) => {
            return msg.sender._id === auth?._id ? (
              <SendMsg key={index} msg={msg.text} />
            ) : (
              <ReceiveMsg key={index} msg={msg.text} />
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      {isTyping ? (
        <Lottie
          autoplay={true}
          style={{ marginTop: 15, marginLeft: 12, height: 23, width: 53 }}
          animationData={animationData}
        />
      ) : null}
      <form className="typing-box" onSubmit={sendMessage}>
        <div className="typing-inp">
          <input
            placeholder="Type your message here..."
            value={typingMsg}
            required
            onChange={(e) => onChangeHandler(e)}
          />
          <button>
            <IoMdSend type="submit" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;

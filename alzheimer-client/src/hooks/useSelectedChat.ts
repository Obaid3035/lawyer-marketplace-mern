import { useContext } from "react";
import { IConversation } from "../Container/Pages/Chat/Chat";
import SelectedChatContext from "../context/SelectedChat";
type useSelectedChatType = {
  selectedChat: IConversation | null;
  setSelectedChat: (chat: any) => void;
};

const useSelectedChat = (): useSelectedChatType => {
  return useContext(SelectedChatContext) as useSelectedChatType;
};

export default useSelectedChat;

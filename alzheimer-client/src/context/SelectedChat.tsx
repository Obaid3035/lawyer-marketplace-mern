import React, { createContext } from "react";
import { IConversation } from "../Container/Pages/Chat/Chat";

const SelectedChatContext = createContext({});

export const SelectedChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedChat, setSelectedChat] = React.useState<IConversation | null>(
    null
  );

  return (
    <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};

export default SelectedChatContext;

import React, { createContext } from "react";
import { INotification } from "../hooks/useNotification";

const NotificationContext = createContext({});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = React.useState<INotification>({
    allUnseenMessages: 0,
    conversation: [],
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

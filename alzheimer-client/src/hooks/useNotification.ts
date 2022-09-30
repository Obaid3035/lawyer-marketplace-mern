import React, { useContext } from "react";
import { IConversation } from "../Container/Pages/Chat/Chat";
import NotificationContext from "../context/NotificationProvider";

export interface INotification {
  conversation: IConversation[];
  allUnseenMessages: number;
}

type useNotificationType = {
  notification: INotification;
  setNotification: any;
};

const useNotification = (): useNotificationType => {
  return useContext(NotificationContext) as useNotificationType;
};

export default useNotification;

import axios from "../util/axios";
import { getTokenFormat } from "../util/helper";

class ChatApi {
  static createConversations(lawyerId: string) {
    return axios.post(`/chat/conversations/${lawyerId}`, {}, getTokenFormat());
  }

  static getConversations() {
    return axios.get(`/chat/conversations`, getTokenFormat());
  }

  static createMessage(conversationsId: string, text: string) {
    return axios.post(
      `/chat/messages/${conversationsId}`,
      {
        text,
      },
      getTokenFormat()
    );
  }

  static getMessages(conversationsId: string) {
    return axios.get(`/chat/messages/${conversationsId}`, getTokenFormat());
  }

  static getNotifications() {
    return axios.get(`/chat/notification`, getTokenFormat());
  }

  static updateMessage(messageId: string) {
    return axios.put(`/chat/messages/${messageId}`, {}, getTokenFormat());
  }
}
export default ChatApi;

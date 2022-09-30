import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { AuthProvider } from "./context/AuthProvider";
import { SelectedChatProvider } from "./context/SelectedChat";
import { SocketProvider } from "./context/SocketProvider";
import { NotificationProvider } from "./context/NotificationProvider";

// axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.baseURL = "https://alzheimer-server.herokuapp.com/";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const app = (
  <AuthProvider>
    <SocketProvider>
      <NotificationProvider>
        <SelectedChatProvider>
          <App />
        </SelectedChatProvider>
      </NotificationProvider>
    </SocketProvider>
  </AuthProvider>
);
root.render(app);

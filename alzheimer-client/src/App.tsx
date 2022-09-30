import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Container/Auth/ForgotPassword/ForgetPassword";
import ResetPassword from "./Container/Auth/ResetPassword/ResetPassword";
import { Slide, ToastContainer } from "react-toastify";
import { adminRoutes, userRoutes } from "./Container/Admin/Navbar/Routes";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import AuthApi from "./api/auth";
import { getToken } from "./util/helper";
import useAuth from "./hooks/useAuth";
import AdminLogin from "./Container/Admin/Pages/Login/Login";
import Chat from "./Container/Pages/Chat/Chat";
import useSocket from "./hooks/useSocket";
import SocketIO from "./util/wss";
import useNotification, { INotification } from "./hooks/useNotification";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {IMessage} from "./Container/Pages/Chat/ChatBox/ChatBox";

const App = () => {
  const { setNotification } = useNotification();
  const { auth, setAuth } = useAuth();
  const { setSocket } = useSocket();

  const notificationReceiveHandler = (message: IMessage) => {
    console.log(message)
    if (window.location.pathname !== "/chat") {
      setNotification((notification: INotification) => {
        let conversation;
        const find = notification.conversation.find(conversation => conversation._id === message.conversation._id)
        if (find) {
          conversation = notification.conversation.map((conversation) => {
            if (conversation._id === message.conversation._id) {
              return {
                ...conversation,
                updatedAt: new Date(),
                last_message: message.text,
              };
            }
            return conversation;
          })
        } else {
          conversation = [{
            ...message.conversation,
            updatedAt: new Date(),
            last_message: message.text,
          }, ...notification.conversation]
        }
        return {
          conversation: conversation,
          allUnseenMessages: notification?.allUnseenMessages! + 1,
        };
      });
    }
  };

  useEffect(() => {
    const ws = new SocketIO();
    ws.connectWithSocketIoServer();
    setSocket(ws);
    ws.onReceiveNotification(notificationReceiveHandler);
    if (getToken()) {
      AuthApi.whoami().then((res) => {
        ws.setup(res.data._id);
        setAuth(res.data);
      });
    }
  }, []);

  const adminLayout = (
    <Route path={"/admin"} element={<AdminLayout />}>
      {adminRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  const userLayout = (
    <Route path={"/"} element={<MainLayout />}>
      {userRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          {adminLayout}
          {userLayout}
          {!auth ? (
            <>
              <Route path={"/admin/login"} element={<AdminLogin />} />
              <Route path={"/forgot-password"} element={<ForgetPassword />} />
              <Route path={"/reset-password"} element={<ResetPassword />} />
            </>
          ) : (
            <Route
              path={"/chat"}
              element={
                <>
                  <Header />
                  <Chat />
                  <Footer />
                </>
              }
            />
          )}
        </Routes>
      </Router>
    </React.Fragment>
  );
};
export default App;

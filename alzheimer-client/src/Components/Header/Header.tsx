import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import MainLogo from "../../Assets/logo.png";
import "./Header.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { BsChat } from "react-icons/bs";
import MessageBox from "../MessageBox/MessageBox";
import NavProfile from "../NavProfile/NavProfile";
import { RiArrowDropDownLine } from "react-icons/ri";
import Avatar from "../../Assets/avatar.png";
import { getToken } from "../../util/helper";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import ChatApi from "../../api/chat";

enum MessageBoxClasses {
  MESSAGE_SHOW = "message_show",
  MESSAGE_HIDE = "message_hide",
}

enum ProfileDropDownToggle {
  DROPDOWN_HIDE = "profile_dropdown_hide",
  DROPDOWN_SHOW = "profile_dropdown_show",
}

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { notification, setNotification } = useNotification();
  const [messageClasses, setMessageClasses] = useState(
    MessageBoxClasses.MESSAGE_HIDE
  );

  const [profileDropdownClasses, setProfileDropdownClasses] = useState(
    ProfileDropDownToggle.DROPDOWN_HIDE
  );

  const onMessageClickHandler = () => {
    if (messageClasses === MessageBoxClasses.MESSAGE_SHOW) {
      setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
    } else {
      setMessageClasses(MessageBoxClasses.MESSAGE_SHOW);
      setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
    }
  };

  const onDropdownClickHandler = () => {
    if (profileDropdownClasses === ProfileDropDownToggle.DROPDOWN_SHOW) {
      setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
    } else {
      setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_SHOW);
      setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
    }
  };

  useEffect(() => {
    if (auth || getToken()) {
      ChatApi.getNotifications().then((res) => {
        setNotification(res.data);
      });
    }
  }, [auth]);

  let authenticateUser = (
    <React.Fragment>
      <form style={{ marginRight: "20px" }}>
        <Input>
          <Form.Control type="text" placeholder="Search" />
        </Input>
      </form>
      <Button type="button" onClick={() => navigate("/caregiver/register")}>
        caregivers join here
      </Button>
    </React.Fragment>
  );

  if (auth || getToken()) {
    authenticateUser = (
      <React.Fragment>
        <Nav.Link className={"notify_item"}>
          <div className={"notification_icon"} onClick={onMessageClickHandler}>
            <BsChat />
            <span className={"badge"}>{notification?.allUnseenMessages!}</span>
          </div>
          <MessageBox
            extraClasses={messageClasses}
            conversation={notification.conversation}
          />
        </Nav.Link>
        <div className={"nav_link"} onClick={onDropdownClickHandler}>
          <div className={"nav_profile"}>
            <img
              width={50}
              alt={"avatar"}
              src={
                auth?.profilePicture?.url ? auth?.profilePicture?.url : Avatar
              }
              className={"ml-2"}
            />
            <p>{auth?.name}</p>
            <RiArrowDropDownLine />
          </div>
          <NavProfile extraClasses={profileDropdownClasses} />
        </div>
      </React.Fragment>
    );
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to={"/"}>
            <img src={MainLogo} alt={"main-logo"} />{" "}
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={"justify-content-end"}
        >
          <Nav className="mr-auto">
            <NavLink to={"/"} className={"nav-link"}>
              Home
            </NavLink>
            <NavLink to={"/about"} className={"nav-link"}>
              About The ALZ Nexus
            </NavLink>
            {authenticateUser}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;

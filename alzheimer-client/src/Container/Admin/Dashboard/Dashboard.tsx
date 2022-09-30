import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Logo from "../../../Assets/logo.png";
import { ISideBarRoutes } from "../../../interfaces";
import useAuth from "../../../hooks/useAuth";
import { removeToken } from "../../../util/helper";
import { successNotify } from "../../../util/toast";

const Dashboard = (props: any) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { setAuth } = useAuth();
  const [sideBar, setSideBar] = useState(false);

  const classes = (path: string) => {
    if (path === location.pathname) {
      return "nav_active";
    }
    return "";
  };

  const onLogoutHandler = () => {
    setAuth(null);
    removeToken();
    successNotify("Successfully logged out");
    navigation("/", {
      replace: true,
    });
  };
  return (
    <div className={sideBar ? "sidebar active" : "sidebar"}>
      <div className={"logo_content"}>
        <div className={"profile"}>
          <p className={"mb-0"}>
            {" "}
            <img alt="logo" src={Logo} />{" "}
          </p>
        </div>
        {sideBar ? (
          <ImCross className={"fa-bars"} onClick={() => setSideBar(false)} />
        ) : (
          <FaIcons.FaBars
            className={"fa-bars"}
            onClick={() => setSideBar(true)}
          />
        )}
      </div>
      <ul className="nav_list">
        {props.sideBarItems.map((item: ISideBarRoutes, index: number) => {
          if (item.path) {
            return (
              <li key={index} className={`${classes(item.path)}`}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          }
        })}
        <li className="logout_btn" onClick={onLogoutHandler}>
          <Link to={"#"}>
            <FiIcons.FiLogOut />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Dashboard;

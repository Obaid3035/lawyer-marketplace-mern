import React from "react";
import * as FiIcon from "react-icons/fi";
import * as CgIcon from "react-icons/cg";
import "./NavProfile.scss";
import {removeToken} from "../../util/helper";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const NavProfileBox = (props: { extraClasses: string }) => {
    const {setAuth} = useAuth();
    const navigation = useNavigate()
    const onLogOutHandler = () => {
        removeToken();
        setAuth(null);
        window.location.href = '/';
    };

    return (
        <div className={`profile_dropdown ${props.extraClasses}`}>
            <div>
                <div
                    className={"profile_dropdown_item"}
                    onClick={() => navigation("/edit-profile")}
                >
                    <CgIcon.CgProfile/>
                    <p>Profile</p>
                </div>
                <div className={"profile_dropdown_item"} onClick={onLogOutHandler}>
                    <FiIcon.FiLogOut/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};
export default NavProfileBox;

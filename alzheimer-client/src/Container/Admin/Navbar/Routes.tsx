import * as AiIcons from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { VscLaw } from "react-icons/vsc";
import { MdSettings } from "react-icons/md";
import { IRoutesLink, ISideBarRoutes } from "../../../interfaces";
import Profile from "../Pages/Profile/Profile";
import Lawyers from "../Pages/Lawyers/Lawyers";
import CareGivers from "../Pages/CareGivers/CareGivers";
import ViewDetails from "../Pages/Lawyers/ViewDetails/ViewDetails";
import Home from "../../Pages/Home/Home";
import React from "react";
import About from "../../Pages/About/About";
import SearchLawyer from "../../Pages/SearchLawyer/SearchLawyer";
import PrivacyPolicy from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import LawyerProfile from "../../Pages/SearchLawyer/LawyerProfile/LawyerProfile";
import LawyerAuth from "../../Lawyer/Pages/Register/Register";
import CareAuth from "../../CareGiver/Pages/Register/Register";
import EditProfile from "../../../Components/EditProfile/EditProfile";
import Reviews from "../../Pages/SearchLawyer/LawyerProfile/Reviews/Reviews";
import CMS from "../Pages/CMS/CMS";

export const userRoutes: IRoutesLink[] = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/search",
    component: <SearchLawyer />,
  },
  {
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    path: "/lawyer-profile/:id",
    component: <LawyerProfile />,
  },
  {
    path: "/lawyer/register",
    component: <LawyerAuth />,
  },
  {
    path: "/caregiver/register",
    component: <CareAuth />,
  },
  {
    path: "/lawyer/login",
    component: <LawyerAuth />,
  },
  {
    path: "/caregiver/login",
    component: <CareAuth />,
  },
  {
    path: "/caregiver/register",
    component: <CareAuth />,
  },
  {
    path: "/caregiver/register",
    component: <CareAuth />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/reviews/:id",
    component: <Reviews />,
  },
];

export const adminRoutes: IRoutesLink[] = [
  {
    path: "/admin/profile",
    component: <Profile />,
  },
  {
    path: "/admin/lawyers",
    component: <Lawyers />,
  },
  {
    path: "/admin/care-givers",
    component: <CareGivers />,
  },
  {
    path: "/admin/detail/:id",
    component: <ViewDetails />,
  },
  {
    path: "/admin/cms",
    component: <CMS />,
  },
];

export const adminSideBarItems: ISideBarRoutes[] = [
  {
    path: "/admin/profile",
    icon: <CgProfile />,
    title: "Profile",
    isSubNav: false,
  },
  {
    path: "/admin/lawyers",
    icon: <VscLaw />,
    title: "Lawyers",
    isSubNav: false,
  },
  {
    path: "/admin/care-givers",
    icon: <AiIcons.AiFillDashboard />,
    title: "CareGivers",
    isSubNav: false,
  },
  {
    path: "/admin/cms",
    icon: <MdSettings />,
    title: "CMS",
    isSubNav: true,
  },
];

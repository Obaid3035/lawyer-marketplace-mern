import React from "react";

export interface IUser {
  firmName: string;
  firmUrl: string;
  expertise: string[];
  _id: string;
  address: string;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  role: USER_ROLE;
  bio: string;
  nic: string;
  profilePicture: {
    cloudinary_id: string;
    url: string;
  };
  location?: {
    type: string;
    coordinates: number[];
  };
  resume?: {
    cloudinary_id: string;
    url: string;
  };
  isVerified?: boolean;
  averageRating: number;
}

export interface IInput {
  children: any;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IMapInputProps {
  selectedCoordinates: ICoordinates | null;
  setSelectedCoordinates: React.Dispatch<
    React.SetStateAction<null | ICoordinates>
  >;
  showMap: boolean;
  google: any;
}

// ----------------------------------- ENUM ------------------------------

export enum RegisterType {
  caregiver = "/caregiver/register",
  lawyer = "/lawyer/register",
}

export enum LoginType {
  caregiver = "/caregiver/login",
  lawyer = "/lawyer/login",
}

export enum USER_ROLE {
  CAREGIVER = "caregiver",
  LAWYER = "lawyer",
}

// Sidebar Interface

export interface ISideBarRoutes {
  icon: JSX.Element;
  path?: string;
  title: string;
  isSubNav?: boolean;
}

// Admin Panel Interface

export interface IRoutesLink {
  component: JSX.Element;
  path: string;
}

export interface ISideBarRoutes {
  icon: JSX.Element;
  path?: string;
  title: string;
  isSubNav?: boolean;
  subNav?: {
    path: string;
    title: string;
  }[];
}

export enum PAGE {
  home = "HOME",
  about = "ABOUT",
  joins = "JOINS",
  privacy = "PRIVACY",
  footer = "FOOTER",
}

export interface IHomeSection1 {
  heading: string;
  text: string;
  image: File;
}
export interface IHomeSection2 {
  heading: string;
  subHeading: string;
  text: string;
  image: File;
  heading_2: string;
  text_2: string;
}

export interface IHomeSection3 {
  heading: string;
  subHeading: string;
  text: string;
  image: File;
}

// About

export interface IBox {
  subHeading: string;
  text: string;
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
}
export interface IAboutSection1 {
  text: string;
  image: File;
}
export interface IAboutSection2 {
  heading: string;
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
  image: File;
}
export interface IAboutSection3 {
  heading: string;
  box_1: string;
  box_2: string;
  box_3: string;
  box_4: string;
  box_5: string;
  box_6: string;
}
export interface IAboutSection4 {
  heading: string;
  box_1: IBox;
  box_2: IBox;
  box_3: IBox;
}
export interface IAboutSection5 {
  heading: string;
  point_1: string;
  point_2: string;
  point_3: string;
  image: File;
}

// Joins Page

export interface IJoinsSection1 {
  image: File;
}
export interface IJoinsSection2 {
  heading: string;
  text: string;
  image: File;
  heading_2: string;
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
}
export interface IJoinsSection3 {
  heading: string;
  text: string;
  point_1: string;
  point_2: string;
  point_3: string;
}

// Privacy Policy

export interface IPrivacyPolicy {
  text: string;
  image: File;
}

//  Footer

export interface IFooterSection1 {
  heading: string;
  image: File;
}
export interface IFooterSection2 {
  text: string;
  phone_number: string;
  email: string;
  location: string;
}

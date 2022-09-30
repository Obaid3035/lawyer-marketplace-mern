import {Router} from "express";
import {ROLE} from "../model/user";
import {SchemaDefinitionProperty} from "mongoose";

export interface IController {
    path: string;
    router: Router
}

interface ICloudinary {
    url: string,
    cloudinary_id: string,
}

export interface IUser {
    _id: string
    name: string
    email: string
    address: string
    password: string
    phoneNumber: string
    firmName: string
    firmUrl: string
    expertise: string[]
    nic: string
    role: ROLE
    bio: string
    isVerified: boolean
    location: {
        type: string,
        coordinates: number[]
    }
    profilePicture: ICloudinary,
    resume: ICloudinary,

    generateToken(): string,

    comparePassword(oldPassword: string): boolean

    isLawyerVerified(): void

    save(): any
}

export interface IReview {
    rating: number,
    description: string,
    caregiver: SchemaDefinitionProperty<string>,
    lawyer: SchemaDefinitionProperty<string>,
}


export interface IConversation {
    _id: number;
    members: SchemaDefinitionProperty<string>[],
    last_message: string
}

export interface IMessage {
    conversation: IConversation,
    sender: SchemaDefinitionProperty<string>,
    text: string,
    seen: boolean,
}


// CMS

export interface IHome {
    section_1: {
        heading: string;
        text: string;
        image: ICloudinary;
    };
    section_2: {
        heading: string;
        subHeading: string;
        text: string;
        image: ICloudinary;
        heading_2: string;
        text_2: string;
    };
    section_3: {
        heading: string;
        subHeading: string;
        text: string;
        image: ICloudinary;
    };
}

export interface IUploadMultipleHome {
    section_1_image: [Express.Multer.File],
    section_2_image: [Express.Multer.File],
    section_3_image: [Express.Multer.File],
}


interface IBox {
    subHeading: string;
    text: string;
    point_1: string;
    point_2: string;
    point_3: string;
    point_4: string;
}

export interface IAbout {
    section_1: {
        text: string;
        image: ICloudinary;
    };
    section_2: {
        heading: string;
        point_1: string;
        point_2: string;
        point_3: string;
        point_4: string;
        image: ICloudinary;
    };
    section_3: {
        heading: string;
        box_1: string;
        box_2: string;
        box_3: string;
        box_4: string;
        box_5: string;
        box_6: string;
    };
    section_4: {
        heading: string;
        box_1: IBox;
        box_2: IBox;
        box_3: IBox;
    };
    section_5: {
        heading: string;
        point_1: string;
        point_2: string;
        point_3: string;
        image: ICloudinary;
    };
}

export interface IUploadMultipleAbout {
    section_1_image: [Express.Multer.File],
    section_2_image: [Express.Multer.File],
    section_5_image: [Express.Multer.File],
}


export interface IFooter{
    section_1: {
        heading: string;
        image: ICloudinary;
    };
    section_2: {
        text: string;
        phone_number: string;
        email: string;
        location: string;
    };
}

export interface IUploadMultipleFooter {
    section_1_image: [Express.Multer.File],
}

export interface IJoin{
    section_1: {
        image: ICloudinary;
    };
    section_2: {
        heading: string;
        text: string;
        image: ICloudinary;
        heading_2: string;
        point_1: string;
        point_2: string;
        point_3: string;
        point_4: string;
    };
    section_3: {
        heading: string;
        text: string;
        point_1: string;
        point_2: string;
        point_3: string;
    };
}

export interface IUploadMultipleJoin{
    section_1_image: [Express.Multer.File],
    section_2_image: [Express.Multer.File],
}

export interface ILawyerJoin{
    section_1: {
        image: ICloudinary;
    };
    section_2: {
        heading: string;
        text: string;
        image: ICloudinary;
        heading_2: string;
        point_1: string;
        point_2: string;
        point_3: string;
        point_4: string;
    };
}

export interface IUploadMultipleJoin{
    section_1_image: [Express.Multer.File],
    section_2_image: [Express.Multer.File],
}


export interface IPrivacyPolicy{
    text: string,
    image: ICloudinary
}

export interface IUploadMultiplePrivacy{
    section_1_image: [Express.Multer.File],
}

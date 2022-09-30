import {model, Schema} from "mongoose";
import {IHome} from "../../interface";

const HomeSchema: Schema<IHome> = new Schema({
    section_1: {
        heading: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String,

        }
    },
    section_2: {
        heading: {
            type: String,
            default: ""
        },
        subHeading: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String,
        },
        heading_2: {
            type: String,
            default: ""
        },
        text_2: {
            type: String,
            default: ""
        },
    },
    section_3: {
        heading: {
            type: String,
            default: ""
        },
        subHeading: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String,
        },
    },
})
const Home =  model<IHome>("home", HomeSchema)
export default Home;

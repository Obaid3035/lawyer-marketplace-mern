import {model, Schema} from "mongoose";
import {IFooter} from "../../interface";

const FooterSchema: Schema<IFooter> = new Schema({
    section_1: {
        image: {
            url: String,
            cloudinary_id: String
        },
        heading: {
            type: String,
            default: ""
        },
    },
    section_2: {
        text: {
            type: String,
            default: ""
        },
        phone_number: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
    }
})
const Footer = model<IFooter>("footer", FooterSchema);

export default Footer;

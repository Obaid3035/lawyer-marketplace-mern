import { Schema,model } from "mongoose";
import {IJoin } from "../../interface";

const JoinSchema: Schema<IJoin> = new Schema({
    section_1: {
        image: {
            url:String,
            cloudinary_id:String
        }
    },
    section_2: {
        heading: {
            type:String,
            default:""
        },
        text: {
            type:String,
            default:""
        },
        image: {
            url:String,
            cloudinary_id:String
        },
        heading_2: {
            type:String,
            default:""
        },
        point_1: {
            type:String,
            default:""
        },
        point_2: {
            type:String,
            default:""
        },
        point_3: {
            type:String,
            default:""
        },
        point_4: {
            type:String,
            default:""
        },
    },
    section_3: {
        heading: {
            type:String,
            default:""
        },
        text: {
            type:String,
            default:""
        },
        point_1: {
            type:String,
            default:""
        },
        point_2: {
            type:String,
            default:""
        },
        point_3: {
            type:String,
            default:""
        },
    }

})
const Join =  model<IJoin>("join",JoinSchema);
export default Join;

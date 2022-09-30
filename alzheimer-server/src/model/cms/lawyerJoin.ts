import { Schema,model } from "mongoose";
import { ILawyerJoin } from "../../interface";

const LawyerJoinSchema: Schema<ILawyerJoin> =new Schema({
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
})
const LawyerJoin =  model<ILawyerJoin>("lawyerJoin",LawyerJoinSchema);
export default LawyerJoin

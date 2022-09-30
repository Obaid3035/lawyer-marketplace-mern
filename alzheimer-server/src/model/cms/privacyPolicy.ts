import {model, Schema} from "mongoose";
import {IPrivacyPolicy} from "../../interface";

const PrivacyPolicySchema: Schema<IPrivacyPolicy> = new Schema({
    text: {
        type: String,
        default: ""
    },
    image: {
        url: String,
        cloudinary_id: String
    },
})
const PrivacyPolicy = model<IPrivacyPolicy>("privacyPolicy", PrivacyPolicySchema)
export default PrivacyPolicy;

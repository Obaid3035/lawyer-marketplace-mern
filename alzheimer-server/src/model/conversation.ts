import mongoose, {Schema} from "mongoose";
import {IConversation} from "../interface";



const ConversationSchema: Schema<IConversation> = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    last_message: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


const Conversation = mongoose.model<IConversation>('conversation', ConversationSchema);

export default Conversation;

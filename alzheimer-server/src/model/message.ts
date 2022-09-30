import mongoose, {Schema} from "mongoose";
import {IMessage} from "../interface";



const MessageSchema: Schema<IMessage> = new Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversation'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Message = mongoose.model<IMessage>('message', MessageSchema);

export default Message;

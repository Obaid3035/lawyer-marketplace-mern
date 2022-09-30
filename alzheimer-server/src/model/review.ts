import mongoose, {Schema} from "mongoose";
import {IReview} from "../interface";



const ReviewSchema: Schema<IReview> = new Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    caregiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});


const Review = mongoose.model<IReview>('review', ReviewSchema);

export default Review;

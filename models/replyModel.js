import mongoose from "mongoose";

const repliesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isAuthorAnonymous: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const Replies = mongoose.models.Replies || mongoose.model("Replies", repliesSchema);




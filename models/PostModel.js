import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    autorName: {
        type: String,
    },
    description: {
        type: String,
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

export const Posts = mongoose.model("Posts", postSchema);




import { model, Schema } from "mongoose";

const commentSchema = new Schema({
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogSchema = new Schema(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [commentSchema],
    },
    { timestamps: true }
);

export const Blog = model("blog", blogSchema);

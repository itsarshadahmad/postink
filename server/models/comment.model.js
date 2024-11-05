import { model, Schema } from "mongoose";

const commentSchema = new Schema(
    {
        commentedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Comment = model("comment", commentSchema);

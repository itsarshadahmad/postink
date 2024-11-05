import { model, Schema } from "mongoose";

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
    },
    { timestamps: true }
);

export const Blog = model("blog", blogSchema);

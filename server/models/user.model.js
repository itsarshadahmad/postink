import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(value);
            },
            message: "Invalid email format",
        },
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
});

export const User = model("User", userSchema);

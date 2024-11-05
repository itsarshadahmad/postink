import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscribedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subscribedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Subscription = model("subscription", subscriptionSchema);

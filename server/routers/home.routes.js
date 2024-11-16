import { Router } from "express";
import { asyncHandler } from "../services/asyncHandler.js";

const app = Router();

app.route("/").get(
    asyncHandler((req, res) => {
        // throw new ApiError(404, "Test", new Error());
        return res.send("Hello World!");
    })
);

export default app;

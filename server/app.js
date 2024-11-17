import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import errorHandler from "./middleware/errorHandler.middleware.js";
import api from "./routers/api.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Morgan middleware for logging
const accessLogStream = fs.createWriteStream(path.join("./log/access.log"), {
    flags: "a",
});

app.use(
    morgan("combined", {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
        stream: accessLogStream,
    })
);

//routes declaration
app.use("/api", api);

// Error handler middleware
app.use(errorHandler);

export { app };

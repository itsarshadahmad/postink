import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

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
const accessLogStream = fs.createWriteStream(
    path.join("./log/access.log"),
    { flags: "a" }
);

app.use(
    morgan("combined", {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
        stream: accessLogStream,
    })
);

//routes import
import home from "./routers/home.routes.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

//routes declaration
app.use("/api", home);

// Error handler middleware
app.use(errorHandler);

export { app };

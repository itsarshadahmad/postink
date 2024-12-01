import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { api } from "./routers/api.js";
import passport from "passport";
import passportConfig from "./config/passport.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

if (mongoose.ConnectionStates.connected) {
    const store = MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
        collection: "sessions",
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        autoRemove: "native", // Default
    });

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 7,
            saveUninitialized: false,
            store: store,
        })
    );
}

// Passport config
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

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

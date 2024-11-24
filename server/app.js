import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import {errorHandler} from "./middleware/errorHandler.middleware.js";
import {api} from "./routers/api.js";
import passport from "passport";
import passportConfig from "./config/passport.config.js";
import session from "express-session";
import connect from "connect-mongo"

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 60 * 24 * 30, // 30 days
        },
        store: connect()
    })
);

// Passport config
app.use(passportConfig(passport));
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

export {app};

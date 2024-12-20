import { Router } from "express";
import passport from "passport";
import { handleUserSignup } from "../controllers/authentication/signup.controller.js";
import {
    handleOAuthGoogleCallback,
    handleUserLogin,
} from "../controllers/authentication/login.controller.js";
import { handleUserLogout } from "../controllers/authentication/logout.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { handleUserProfile } from "../controllers/authentication/profile.controller.js";

const userRouter = Router();

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(upload.single("avatar"), handleUserSignup);

userRouter.route("/auth/google").post(
    passport.authenticate("google", {
        scope: ["profile", "email"],
        callbackURL: "/api/user/auth/google/callback",
    })
);

userRouter.route("/auth/google/callback").get(
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),
    handleOAuthGoogleCallback
);

userRouter.route("/public/profile/:_id").get(handleUserProfile);

userRouter.route("/logout").post(handleUserLogout);

export { userRouter };

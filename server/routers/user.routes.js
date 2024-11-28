import { Router } from "express";
import passport from "passport";
import { handleUserSignup } from "../controllers/authentication/signup.controller.js";
import { handleUserLogin } from "../controllers/authentication/login.controller.js";
import { handleUserLogout } from "../controllers/authentication/logout.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userRouter = Router();

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignup);

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
    asyncHandler((req, res) => {
        const accessToken = req.user.generateAccessToken();
        let refreshToken = req.user.refreshToken;
        if (!refreshToken) {
            refreshToken = req.user.generateRefreshToken();
        }

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 14 * 24 * 60 * 60,
        });
        return res.redirect(process.env.CLIENT_URL);
    })
);

userRouter.route("/logout").post(handleUserLogout);

export { userRouter };

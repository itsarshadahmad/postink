import { Router } from "express";
import passport from "passport";
import { handleUserSignup } from "../controllers/authentication/signup.controller.js";
import { handleUserLogin } from "../controllers/authentication/login.controller.js";
import { handleUserLogout } from "../controllers/authentication/logout.controller.js";
import {
    regenerateAccessToken,
    verifyJWT,
} from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignup);

// TODO: REMOVE THIS TEST ROUTE
userRouter.route("/google").get((req, res) => {
    res.send(
        "<form method='post' action='/api/user/auth/google'><button type='submit'>Google OAuth</button></form>"
    );
});

userRouter
    .route("/protected")
    .get(regenerateAccessToken, verifyJWT, (req, res) => {
        res.json({ ok: "Success" });
    });

userRouter.route("/auth/google").post(
    passport.authenticate("google", {
        scope: ["profile", "email"],
        callbackURL: "/api/user/auth/google/callback",
    })
);

userRouter.route("/auth/google/callback").get(
    passport.authenticate("google", {
        failureRedirect: "/login",
        // successRedirect: "/",
    }),
    (req, res) => {
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
        // TODO: redirect to client
        return res.redirect("/api/user/google");
    }
);

userRouter.route("/logout").post(handleUserLogout);

export { userRouter };

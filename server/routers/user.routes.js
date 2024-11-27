import { Router } from "express";
import passport from "passport";
import { handleUserSignup } from "../controllers/authentication/signup.controller.js";
import { handleUserLogin } from "../controllers/authentication/login.controller.js";
import { handleUserLogout } from "../controllers/authentication/logout.controller.js";

const userRouter = Router();

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignup);

// TODO: REMOVE THIS TEST ROUTE
userRouter.route("/google").get((req, res) => {
    res.send(
        "<form method='post' action='/api/user/auth/google'><button type='submit'>Google OAuth</button></form>"
    );
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
        successRedirect: "/",
    }),
    (req, res) => {
        res.json({ ok: "Success" });
    }
);

userRouter.route("/logout").post(handleUserLogout);

export { userRouter };

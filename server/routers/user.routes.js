import { Router } from "express";
import passport from "passport";

const userRouter = Router();

userRouter.route("/login").post(
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

// TODO: Conform this route
userRouter.route("/auth/google").get(
    passport.authenticate("google", {
        scope: ["profile", "email"],
        // callbackURL: "/auth/google/callback",
    })
);

userRouter.route("/auth/google/callback").get({
    failureRedirect: "/login",
    successRedirect: "/",
});

userRouter.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
});

export { userRouter };

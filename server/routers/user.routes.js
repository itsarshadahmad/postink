import { Router } from "express";
import passport from "passport";
import { handleUserSignup } from "../controllers/authentication/signup.controller.js";
import { handleUserLogin } from "../controllers/authentication/login.controller.js";
import {
    checkAuthentication,
    verifyJWT,
} from "../middleware/auth.middleware.js";
import { handleUserLogout } from "../controllers/authentication/logout.controller.js";

const userRouter = Router();

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignup);
// userRouter.route("/test").get(verifyJWT, (req, res) => {
//     console.log(req.user);
//     return res.json("User routes");
// });

// TODO: Conform this route
// userRouter.route("/auth/google").get(
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//         callbackURL: "/auth/google/callback",
//     })
// );

// TODO: fix callback of get method
// userRouter.route("/auth/google/callback").get({
//     failureRedirect: "/login",
//     successRedirect: "/",
// });

userRouter.route("/logout").post(handleUserLogout);

export { userRouter };

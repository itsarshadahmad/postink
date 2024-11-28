import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
    createUserForOAuth,
    findUserByGoogleId,
    findUserById,
} from "../models/user.model.js";

export default function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/user/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const existingUser = await findUserByGoogleId({
                    googleId: profile.id,
                });
                if (existingUser) {
                    return done(null, existingUser);
                }

                // If no user exists, create a new one
                const newUser = await createUserForOAuth({
                    type: "google",
                    googleId: profile.id,
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                });
                newUser.refreshToken = newUser.generateRefreshToken();
                newUser.save();
                return done(null, newUser);
            }
        )
    );

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

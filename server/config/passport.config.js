import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { compare } from "bcrypt";
import { findUserByEmail, findUserById } from "../models/user.model.js";

export default function (passport) {
    // Local Strategy
    passport.use(
        new LocalStrategy(async (email, password, done) => {
            try {
                // Find user by username
                const user = await findUserByEmail({ email });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                // Match password
                const isMatch = await compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Incorrect password" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    // TODO: verify code & fix error - choose best option from both options below.
    // Google Strategy
    // passport.use(
    //     new GoogleStrategy(
    //         {
    //             clientID: process.env.GOOGLE_CLIENT_ID,
    //             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //             callbackURL: "/auth/google/callback",
    //         },
    //         async (accessToken, refreshToken, profile, done) => {
    //             const user = {
    //                 googleId: profile.id,
    //                 displayName: profile.displayName,
    //                 email: profile.emails[0].value,
    //             };

    //             // Placeholder for database save logic
    //             User[profile.id] = user;

    //             // Generate JWT token
    //             const token = jwt.sign({ id: user.googleId }, JWT_SECRET, {
    //                 expiresIn: "1h",
    //             });

    //             // Return user and token
    //             return done(null, { user, token });

    //             try {
    //                 // Check if user already exists
    //                 let user = await findOne({ googleId: profile.id });
    //                 if (user) {
    //                     // Update access and refresh tokens
    //                     // user.accessToken = accessToken;
    //                     user.refreshToken = refreshToken;
    //                     await user.save();
    //                     return done(null, user);
    //                 } else {
    //                     // Create new user
    //                     const newUser = new User({
    //                         googleId: profile.id,
    //                         username: profile.displayName,
    //                         accessToken,
    //                         refreshToken,
    //                     });
    //                     user = await newUser.save();
    //                     return done(null, user);
    //                 }
    //             } catch (err) {
    //                 return done(err);
    //             }
    //         }
    //     )
    // );

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, username: user.username });
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

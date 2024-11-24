import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { compare } from "bcryptjs";
import User, { findOne, findById } from "./models/User"; // Faulty code

export default function (passport) {
    // TODO: Verify this code and fix issues
    // Local Strategy
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                // Find user by username
                const user = await findOne({ username });
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

    // Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {

                const user = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                  };
            
                  // Placeholder for database save logic
                  User[profile.id] = user;
            
                  // Generate JWT token
                  const token = jwt.sign({ id: user.googleId }, JWT_SECRET, { expiresIn: '1h' });
            
                  // Return user and token
                  return done(null, { user, token });

                try {
                    // Check if user already exists
                    let user = await findOne({ googleId: profile.id });
                    if (user) {
                        // Update access and refresh tokens
                        // user.accessToken = accessToken;
                        user.refreshToken = refreshToken;
                        await user.save();
                        return done(null, user);
                    } else {
                        // Create new user
                        const newUser = new User({
                            googleId: profile.id,
                            username: profile.displayName,
                            accessToken,
                            refreshToken,
                        });
                        user = await newUser.save();
                        return done(null, user);
                    }
                } catch (err) {
                    return done(err);
                }
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
            const user = await findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

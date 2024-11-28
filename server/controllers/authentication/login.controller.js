import { findUserByEmail } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const handleUserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await findUserByEmail(email);
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    const accessTokenConfig = {
        httpOnly: true,
        secure: true, // Set to true in production for HTTPS
        sameSite: "Strict",
        maxAge: process.env.REFRESH_TOKEN_EXPIRY, // 15 minutes
    };

    const refreshTokenConfig = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: process.env.ACCESS_TOKEN_EXPIRY,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenConfig)
        .cookie("refreshToken", refreshToken, refreshTokenConfig)
        .send(
            new ApiResponse(
                200,
                {
                    email: user.email,
                    _id: user._id,
                    blogs: user.blogs,
                },
                "User authenticated!"
            )
        );
});

export { handleUserLogin };

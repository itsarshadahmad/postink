import { findUserByEmail } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const accessTokenConfig = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
};

const refreshTokenConfig = {
    httpOnly: true,
    secure: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
};

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

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenConfig)
        .cookie("refreshToken", refreshToken, refreshTokenConfig)
        .json(
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

const handleOAuthGoogleCallback = asyncHandler(async (req, res) => {
    const accessToken = req.user.generateAccessToken();
    let refreshToken = req.user.refreshToken;
    if (!refreshToken) {
        refreshToken = req.user.generateRefreshToken();
    }

    return res
        .cookie("accessToken", accessToken, accessTokenConfig)
        .cookie("refreshToken", refreshToken, refreshTokenConfig)
        .json(new ApiResponse(200, { success: true }, "User Authenticated!"));
});

export { handleUserLogin, handleOAuthGoogleCallback };

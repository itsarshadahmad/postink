import { findUserByEmail } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import querystring from "querystring";

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
    if (!user.password && user.type === "google") {
        throw new ApiError(401, "Please authenticate using google");
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
                    fullName: user.fullName,
                    email: user.email,
                    _id: user._id,
                    avatar: user?.avatar,
                    blogs: user.blogs,
                    refreshToken,
                    accessToken,
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
    const query = querystring.stringify({
        _id: String(req.user._id),
        email: req.user.email,
        fullName: req.user.fullName,
        accessToken: accessToken,
        refreshToken: refreshToken,
    });

    return await res
        .cookie("accessToken", accessToken, accessTokenConfig)
        .cookie("refreshToken", refreshToken, refreshTokenConfig)
        .redirect(`${process.env.CLIENT_URL}/auth/google?${query}`);
});

export { handleUserLogin, handleOAuthGoogleCallback };

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findUserById } from "../models/user.model.js";
import { decodeAccessToken, decodeRefreshToken } from "../utils/token.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await decodeAccessToken(token);
    const user = await findUserById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }

    req.user = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
    };
    return next();
});

const regenerateAccessToken = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (accessToken) {
            return next();
        }

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify refresh token (e.g., compare with stored token in DB)
        const decodedRefreshToken = await decodeRefreshToken(refreshToken);
        const user = await findUserById(decodedRefreshToken?._id);

        if (refreshToken !== user.refreshToken) {
            throw new ApiError(403, "Invalid refresh token");
        }

        // Generate & send new access token
        const newAccessToken = await user.generateAccessToken();
        return res
            .cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
            })
            .redirect(`${req.originalUrl}`);
    } catch (err) {
        throw new ApiError(403, "Error regenerating tokens", err);
    }
});

export { verifyJWT, regenerateAccessToken };

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findUserById } from "../models/user.model.js";
import { decodeAccessToken } from "../utils/token.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
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
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export { verifyJWT };

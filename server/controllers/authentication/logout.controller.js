import { removeRefreshToken } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { decodeRefreshToken } from "../../utils/token.js";

const handleUserLogout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const _id = req.body._id;

    if (!refreshToken) {
        throw new ApiError(
            401,
            { error: "No refresh token provided" },
            "Unauthorized Request"
        );
    }

    const decode = await decodeRefreshToken(refreshToken);
    if (!decode) {
        await removeRefreshToken(_id);
    } else {
        await removeRefreshToken(decode._id);
    }

    await res.clearCookie("accessToken");
    await res.clearCookie("refreshToken");
    await req.session.destroy();

    return res.send(
        new ApiResponse(200, { ok: "done" }, "You have been logged out")
    );
});

export { handleUserLogout };

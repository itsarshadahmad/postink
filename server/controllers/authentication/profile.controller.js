import { findUserById } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const handleUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    if (!_id) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await findUserById(_id);
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                fullName: user.fullName,
                email: user.email,
                _id: user._id,
                avatar: user?.avatar,
            },
            "User Information!"
        )
    );
});

export { handleUserProfile };

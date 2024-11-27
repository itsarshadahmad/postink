import { createNewUser } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const handleUserSignup = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    if ([email, password, fullName].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    const user = await createNewUser({ email, password, fullName });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save();

    const responseData = {
        email: user.email,
        fullName: user.fullName,
        blogs: user.blogs,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .send(new ApiResponse(201, responseData, "User created successfully!"));
});
export { handleUserSignup };

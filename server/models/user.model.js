import { User } from "./user.mongo.js";
import { ApiError } from "../utils/ApiError.js";

async function findUserByEmail(email) {
    const user = await User.findOne({ email }).catch((err) => {
        throw new ApiError(500, "Error finding user by email!", err);
    });
    return user;
}

async function findUserById(id) {
    return await User.findOne({ _id: id }).catch((err) => {
        throw new ApiError(500, "Error finding user by ID!", err);
    });
}

async function createNewUser({ fullName, email, password, avatar }) {
    const user = await User.create({
        type: "email",
        fullName,
        email,
        password,
        avatar,
    }).catch((err) => {
        throw new ApiError(500, "Error creating new user!", err);
    });
    return user;
}

async function updateUserEmail(_id, email) {
    const user = await User.findByIdAndUpdate({ _id }, { email }).catch(
        (err) => {
            throw new ApiError(500, "Error updating user email!", err);
        }
    );
    return user;
}

async function updateUser(fullName, email, password) {
    const updatedUser = await User.findOneAndUpdate(
        { email },
        {
            fullName,
            email,
            password,
        },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error updating user!", err);
    });
    return updatedUser;
}

async function deleteUserByEmail(email) {
    const deletedUser = await User.findOneAndDelete({ email }).catch((err) => {
        throw new ApiError(500, "Error deleting user!", err);
    });
    return deletedUser;
}

async function removeRefreshToken(_id) {
    return await User.updateOne(
        { _id },
        { $set: { refreshToken: null } }
    ).catch((err) => {
        throw new ApiError(500, "Error removing refresh token!", err);
    });
}

async function findUserByFilter(filter) {
    return await User.find(filter).catch((err) => {
        throw new ApiError(500, "Error finding users by filter!", err);
    });
}

async function findUserByGoogleId(googleId) {
    const user = await User.where(googleId).findOne();
    return user;
}

async function createUserForOAuth({
    googleId,
    fullName,
    email,
    avatar,
    refreshToken,
}) {
    try {
        const user = await User.create({
            type: "google",
            googleId,
            fullName,
            email,
            avatar,
            refreshToken,
        });
        return user;
    } catch (err) {
        throw new ApiError(500, "Error creating OAuth user!", err);
    }
}

export {
    findUserByEmail,
    findUserById,
    createNewUser,
    updateUser,
    deleteUserByEmail,
    updateUserEmail,
    removeRefreshToken,
    findUserByFilter,
    createUserForOAuth,
    findUserByGoogleId,
};

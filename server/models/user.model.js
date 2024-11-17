import { User } from "./user.mongo.js";

async function findUserByUsername(username) {
    const user = await User.findOne({ username }).catch((err) => {
        throw new ApiError(500, "Error finding user by username!", err);
    });
    return user;
}

async function findUserByEmail(email) {
    const user = await User.findOne({ email }).catch((err) => {
        throw new ApiError(500, "Error finding user by email!", err);
    });
    return user;
}

async function createNewUser(username, fullName, email, password) {
    const user = await User.create(username, fullName, email, password).catch(
        (err) => {
            throw new ApiError(500, "Error creating new user!", err);
        }
    );
    return user;
}

async function updateUser(username, fullName, email, password) {
    const updatedUser = await User.findOneAndUpdate(
        { username },
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

export {
    findUserByUsername,
    findUserByEmail,
    createNewUser,
    updateUser,
    deleteUserByEmail,
};

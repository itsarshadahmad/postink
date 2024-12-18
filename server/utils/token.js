import jwt from "jsonwebtoken";

async function decodeRefreshToken(token) {
    try {
        const decoded = await jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );
        return decoded;
    } catch (error) {
        if (err.name !== "TokenExpiredError") {
            console.error(err);
        }
        return null;
    }
}

async function decodeAccessToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        if (err.name !== "TokenExpiredError") {
            console.error(err);
        }
        return null;
    }
}

export { decodeRefreshToken, decodeAccessToken };

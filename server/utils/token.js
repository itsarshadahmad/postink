import jwt from "jsonwebtoken";

async function decodeRefreshToken(token) {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded;
}

async function decodeAccessToken(token) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
}

export { decodeRefreshToken, decodeAccessToken };

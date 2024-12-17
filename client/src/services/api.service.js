import axios from "axios";
import CONSTANT from "../conf/constant.js";

// TODO: Add system to include access and refresh token as header in every request
const api = axios.create(
    {
        baseURL: `${CONSTANT.API_URL}/api`,
        withCredentials: true,
    },
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
);

export default api;

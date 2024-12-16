import axios from "axios";
import CONSTANT from "../conf/constant.js";

const api = axios.create({
    baseURL: `${CONSTANT.API_URL}/api`,
    withCredentials: true,
});

export default api;

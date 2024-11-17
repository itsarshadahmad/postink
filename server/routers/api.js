import home from "./home.routes.js";
import { Router } from "express";

const api = Router();

api.use("/", home);

export default api;

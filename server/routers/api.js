import { blogRouter } from "./blog.routes.js";
import { Router } from "express";
import { userRouter } from "./user.routes.js";

const api = Router();

api.use("/blog", blogRouter);
api.use("/user", userRouter);

export { api };

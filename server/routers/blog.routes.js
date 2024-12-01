import { Router } from "express";
import {
    getAllLatestBlogs,
    handleCreateNewBlog,
    getBlogByBlogId,
    getAllBlogsOfUserById,
    handleUpdateBlogById,
    handleDeleteBlogById,
} from "../controllers/blog/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {
    verifyJWT,
    regenerateAccessToken,
} from "../middleware/auth.middleware.js";

const blogRouter = Router();

blogRouter.route("/").get(getAllLatestBlogs);
blogRouter.route("/:id").get(getBlogByBlogId);
blogRouter
    .route("/:userId")
    .get(regenerateAccessToken, verifyJWT, getAllBlogsOfUserById);
blogRouter
    .route("/new")
    .post(
        upload.single("coverImage"),
        regenerateAccessToken,
        verifyJWT,
        handleCreateNewBlog
    );
blogRouter
    .route("/update")
    .put(
        upload.single("coverImage"),
        regenerateAccessToken,
        verifyJWT,
        handleUpdateBlogById
    );
blogRouter
    .route("/delete")
    .delete(regenerateAccessToken, verifyJWT, handleDeleteBlogById);

export { blogRouter };

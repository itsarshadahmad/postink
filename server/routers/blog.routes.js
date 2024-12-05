import { Router } from "express";
import {
    getAllLatestBlogs,
    handleCreateNewBlog,
    getBlogByBlogId,
    getAllBlogsOfUserById,
    handleUpdateBlogById,
    handleDeleteBlogById,
    handleAddLikeOnBlog,
    handleRemoveLikeFromBlog,
    handleNewComment,
    handleDeleteComment,
} from "../controllers/blog/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {
    verifyJWT,
    regenerateAccessToken,
} from "../middleware/auth.middleware.js";

const blogRouter = Router();

blogRouter.route("/").get(getAllLatestBlogs);
blogRouter.route("/:blogId").get(getBlogByBlogId);
blogRouter
    .route("/user/:userId")
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
    .route("/update/:blogId")
    .patch(
        upload.single("coverImage"),
        regenerateAccessToken,
        verifyJWT,
        handleUpdateBlogById
    );
blogRouter
    .route("/delete/:blogId")
    .delete(regenerateAccessToken, verifyJWT, handleDeleteBlogById);

blogRouter
    .route("/like/add")
    .post(regenerateAccessToken, verifyJWT, handleAddLikeOnBlog);

blogRouter
    .route("/like/remove")
    .post(regenerateAccessToken, verifyJWT, handleRemoveLikeFromBlog);

blogRouter
    .route("/comment/add")
    .post(regenerateAccessToken, verifyJWT, handleNewComment);

blogRouter
    .route("/comment/remove")
    .post(regenerateAccessToken, verifyJWT, handleDeleteComment);

export { blogRouter };

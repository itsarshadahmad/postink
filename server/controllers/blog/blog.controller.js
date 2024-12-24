import {
    addCommentToBlog,
    addLikeToBlog,
    deleteBlogById,
    getAllBlogsByDate,
    getAllBlogsFromUserId,
    getBlogById,
    removeCommentFromBlog,
    removeLikeFromBlog,
    updateBlogById,
} from "../../models/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createNewBlog } from "../../models/blog.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { removeImage } from "../../utils/removeImage.js";

const getAllLatestBlogs = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const blogs = await getAllBlogsByDate(page, limit);
    return res.json(
        new ApiResponse(200, blogs, "All blogs returned successfully")
    );
});

const handleCreateNewBlog = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { title, content } = req.body;
    if ([userId, title, content].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // coverImage file path
    const SERVER_URL = req.protocol + "://" + req.get("host");
    const coverImage = req?.file?.filename
        ? SERVER_URL + "/uploads/" + req?.file?.filename
        : undefined;
    const newBlog = await createNewBlog(userId, title, content, coverImage);
    return res
        .status(201)
        .json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

const getBlogByBlogId = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const blog = await getBlogById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }
    return res.status(200).json(new ApiResponse(200, blog));
});

const getAllBlogsOfUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const blogs = await getAllBlogsFromUserId(userId);
    return res
        .status(200)
        .json(new ApiResponse(200, blogs, "User blogs retained successfully"));
});

const handleUpdateBlogById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { blogId } = req.params;

    const SERVER_URL = req.protocol + "://" + req.get("host");
    const coverImage = req?.file?.filename
        ? SERVER_URL + "/uploads/" + req?.file?.filename
        : undefined;

    const { title, content } = req.body;
    const blog = await getBlogById(blogId);
    const updatedBlog = await updateBlogById(
        userId,
        blogId,
        title,
        content,
        coverImage
    );
    if (updatedBlog.coverImage !== blog.coverImage) {
        removeImage(blog.coverImage);
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const handleDeleteBlogById = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const { blogId } = req.params;
    const response = await deleteBlogById(blogId, userId);
    await removeImage(response?.coverImage);
    return res
        .status(200)
        .json(new ApiResponse(200, response, "Blog deleted successfully"));
});

const handleAddLikeOnBlog = asyncHandler(async (req, res) => {
    const { blogId, userId } = req.body;
    if ([userId, blogId].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const blog = await addLikeToBlog(blogId, userId);
    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Like added successfully"));
});

const handleRemoveLikeFromBlog = asyncHandler(async (req, res) => {
    const { blogId, userId } = req.body;
    if ([userId, blogId].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const blog = await removeLikeFromBlog(blogId, userId);
    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Like removed successfully"));
});

const handleNewComment = asyncHandler(async (req, res) => {
    const { blogId, userId, comment } = req.body;
    if ([userId, blogId, comment].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const newComment = await addCommentToBlog(blogId, userId, comment);
    return res
        .status(201)
        .json(new ApiResponse(201, newComment, "Comment created successfully"));
});

const handleDeleteComment = asyncHandler(async (req, res) => {
    const { blogId, userId, commentId } = req.body;
    if ([userId, blogId, commentId].some((item) => item === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const response = await removeCommentFromBlog(blogId, userId, commentId);
    return res
        .status(200)
        .json(new ApiResponse(200, response, "Comment deleted successfully"));
});

export {
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
};

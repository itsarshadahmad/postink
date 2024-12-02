import {
    deleteBlogById,
    getAllBlogsByDate,
    getAllBlogsFromUserId,
    getBlogById,
    updateBlogById,
} from "../../models/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { createNewBlog } from "../../models/blog.model.js";
import { ApiError } from "../../utils/ApiError.js";

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
    const blog = await updateBlogById(
        userId,
        blogId,
        title,
        content,
        coverImage
    );
    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

const handleDeleteBlogById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { blogId } = req.params;
    console.log(blogId);
    const response = await deleteBlogById(blogId, userId);
    return res.send(
        new ApiResponse(200, response, "Blog deleted successfully")
    );
});

export {
    getAllLatestBlogs,
    handleCreateNewBlog,
    getBlogByBlogId,
    getAllBlogsOfUserById,
    handleUpdateBlogById,
    handleDeleteBlogById,
};

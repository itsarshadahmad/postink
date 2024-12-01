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
    const blogId = req.params.id;
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
        .send(new ApiResponse(200, blogs, "User blogs retained successfully"));
});

const handleUpdateBlogById = asyncHandler(async (req, res) => {
    const { title, content, coverImage, blogId, userId } = req.body;
    // TODO: Authenticate userId with blog createdBy to update, else reject
    const blog = await updateBlogById(blogId, title, content, coverImage);
    return res.send(new ApiResponse(200, blog, "Blog updated successfully"));
});

const handleDeleteBlogById = asyncHandler(async (req, res) => {
    const { blogId, userId } = req.params;
    // const user = await getUserById(userId);
    // TODO: If user.id is same as blog createdBy then delete else reject
    await deleteBlogById(blogId);
    return res.send(new ApiResponse(200, null, "Blog deleted successfully"));
});

export {
    getAllLatestBlogs,
    handleCreateNewBlog,
    getBlogByBlogId,
    getAllBlogsOfUserById,
    handleUpdateBlogById,
    handleDeleteBlogById,
};

import { Blog } from "./blog.mongo.js";
import { ApiError } from "../utils/ApiError.js";

async function getAllBlogsFromUserId(userId, page = 1, limit = 10) {
    const blogs = await Blog.find({ createdBy: userId })
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .catch((err) => {
            throw new ApiError(500, "Unable to get blogs by userId!", err);
        });

    const totalCountOfBlogs = blogs?.length;
    const totalPages = Math.ceil(totalCountOfBlogs / limit);
    return { blogs, totalCountOfBlogs, totalPages };
}

async function getBlogById(blogId) {
    const blog = await Blog.findOne({ _id: blogId }).catch((err) => {
        throw new ApiError(500, "Unable to get blog by Id!", err);
    });
    return blog;
}

async function getAllBlogsByDate(page = 1, limit = 10) {
    // Pagination parameters
    //const page = 2; // The desired page number (starting from 1)
    //const limit = 10; // The number of items per page

    try {
        const totalCountOfBlogs = await Blog.countDocuments({});
        const totalPages = Math.ceil(totalCountOfBlogs / limit);

        const blogs = await Blog.find({})
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { blogs, totalCountOfBlogs, totalPages };
    } catch (err) {
        throw new ApiError(500, "Unable to find blogs", err);
    }
}

async function createNewBlog(userId, title, content, coverImage) {
    const blog = await Blog.create({
        createdBy: userId,
        title,
        content,
        coverImage,
    }).catch((err) => {
        throw new ApiError(500, "Error creating new blog!", err);
    });
    return blog;
}

async function updateBlogById(
    userId,
    blogId,
    updatedTitle,
    updatedContent,
    updatedCoverImage
) {
    const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: blogId, createdBy: userId },
        {
            title: updatedTitle,
            content: updatedContent,
            coverImage: updatedCoverImage,
        },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error updating blog!", err);
    });
    return updatedBlog;
}

async function deleteBlogById(blogId, userId) {
    const deletedBlog = await Blog.findByIdAndDelete({
        _id: blogId,
        createdBy: userId,
    }).catch((err) => {
        throw new ApiError(500, "Error deleting blog!", err);
    });
    return deletedBlog;
}

async function addLikeToBlog(blogId, userId) {
    const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $addToSet: { likes: userId } },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error adding like to blog!", err);
    });
    return updatedBlog;
}

async function removeLikeFromBlog(blogId, userId) {
    const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $pull: { likes: userId } },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error removing like from blog!", err);
    });
    return updatedBlog;
}

async function addCommentToBlog(blogId, userId, comment) {
    const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $push: { comments: { commentedBy: userId, comment } } },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error adding comment to blog!", err);
    });
    return updatedBlog;
}

async function removeCommentFromBlog(blogId, userId, commentId) {
    const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $pull: { comments: { commentedBy: userId, _id: commentId } } },
        { new: true }
    ).catch((err) => {
        throw new ApiError(500, "Error removing comment from blog!", err);
    });
    return updatedBlog;
}

export {
    getAllBlogsFromUserId,
    getBlogById,
    getAllBlogsByDate,
    createNewBlog,
    updateBlogById,
    deleteBlogById,
    addLikeToBlog,
    removeLikeFromBlog,
    addCommentToBlog,
    removeCommentFromBlog,
};

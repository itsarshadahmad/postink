import { Link } from "react-router";
import placeholderCoverImage from "../assets/No_Cover_Found.png";
import parse from "html-react-parser";

export default function Card({ blogs }) {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
                    <h1 className="text-4xl font-semibold text-gray-900">
                        Blogs
                    </h1>
                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-1">
                        {blogs.length > 0 &&
                            blogs.map((blog) => (
                                <Link
                                    to={`/blog/${blog._id}`}
                                    key={blog._id}
                                    className="group relative"
                                >
                                    <img
                                        alt="Blog Cover"
                                        src={
                                            blog.coverImage
                                                ? blog.coverImage
                                                : placeholderCoverImage
                                        }
                                        className="w-80 max-lg:w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                    />
                                    <h3 className="mt-2 text-sm text-gray-900 font-bold">
                                        <span className="absolute inset-0" />
                                        {blog.title}
                                    </h3>
                                    <p className="text-base font-semibold text-gray-700 mb-6">
                                        {blog?.content &&
                                            parse(
                                                blog?.content?.substring(0, 50)
                                            )}...
                                    </p>
                                </Link>
                            ))}

                        {blogs.length === 0 && (
                            <h1 className="mt-6 text-xl text-gray-600">
                                No Blogs Found
                            </h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

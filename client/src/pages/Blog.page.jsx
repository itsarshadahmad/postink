import { useEffect, useState } from "react";
import api from "../services/api.service";
import { useNavigate, useParams } from "react-router";
import SocialInteraction from "../components/SocialInteraction.component";

export default function Blog() {
    const [blog, setBlog] = useState();
    const params = useParams();
    const navigate = useNavigate();
    const _id = params._id;
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        api.get(`/blog/${_id}`)
            .then((res) => {
                if (!res.data.success) {
                    return navigate("/404");
                }
                console.log(res.data.data);
                setBlog(res.data.data);
                setComments(res.data.data.comments);
                setLikes(res.data.data.likes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [_id, navigate]);
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-3xl mx-auto">
                    {/* Blog post header */}
                    <div className="py-8">
                        <h1 className="text-3xl font-bold mb-2">
                            {blog?.title}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Published on{" "}
                            {new Date(blog?.createdAt).toUTCString()}
                        </p>
                    </div>

                    {/* Featured image */}
                    {blog?.coverImage && (
                        <img
                            src={blog?.coverImage}
                            alt="Featured image"
                            className="w-full h-auto mb-8"
                        />
                    )}

                    {/* Blog post content */}
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
                        <p>{blog?.content}</p>
                    </div>
                </div>
            </div>
            <SocialInteraction comments={comments} likes={likes} />
        </>
    );
}

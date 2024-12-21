import { useEffect, useState } from "react";
import Comment from "./Comment.component";
import CommentBox from "./CommentBox.component";
import LikeButton from "./LikeButton.component";

export default function SocialInteraction({ comments, likes, blogId }) {
    const [commentList, setCommentList] = useState(comments);
    useEffect(() => {
        setCommentList(comments);
    }, [comments]);
    // TODO: Add like button for blog and connect to backend
    return (
        <>
            <section className="bg-white w-full dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-white mb-6">
                        <LikeButton
                            likesList={likes}
                            likeImageStyle="w-10 h-10"
                            buttonTextStyles="text-2xl dark:text-white"
                        />
                    </h1>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Discussion ({commentList.length})
                        </h2>
                    </div>
                    <CommentBox
                        serverUrl="/blog/comment/add"
                        blogId={blogId}
                        commentList={commentList}
                        setCommentList={setCommentList}
                    />
                    {commentList.length > 0 && (
                        <>
                            {commentList.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    userId={comment.commentedBy}
                                    dateTime={comment.createdAt}
                                    comment={comment.comment}
                                />
                            ))}
                        </>
                    )}

                    {/* Nested Comment */}
                    {/* <Comment styles={"p-6 mb-3 ml-6 lg:ml-12"} /> */}
                </div>
            </section>
        </>
    );
}

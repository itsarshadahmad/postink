import Comment from "./Comment.component";
import CommentBox from "./CommentBox.component";

export default function LikeComment({ comments, likes }) {
    // TODO: Add like button for blog and connect to backend
    return (
        <>
            <section className="bg-white w-full dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Discussion ({comments.length})
                        </h2>
                    </div>
                    <CommentBox />
                    {comments.length > 0 && (
                        <>
                            {comments.map((comment) => (
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

import { useForm } from "react-hook-form";
import api from "../services/api.service";

export default function CommentBox({
    serverUrl = "",
    blogId,
    commentList,
    setCommentList,
}) {
    const { register, handleSubmit } = useForm();
    console.log(commentList);

    const onSubmitComment = (data) => {
        console.log(data);
        const userId = localStorage.getItem("_id");
        api.post(serverUrl, {
            comment: data.comment,
            userId,
            blogId,
        }).then((response) => {
            console.log(response.data.data);
            setCommentList([...commentList, response.data.data.comments]);
        });
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit(onSubmitComment)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                    Your comment
                </label>
                <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    {...register("comment")}
                ></textarea>
            </div>
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white hover:bg-primary-800
                            bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 rounded-lg focus:outline-none focus:ring-offset-2 focus:ring-offset-white"
            >
                Post comment
            </button>
        </form>
    );
}

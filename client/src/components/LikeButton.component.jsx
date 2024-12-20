import { useState } from "react";
import LikeIcon from "../assets/like.png";
import LikedIcon from "../assets/liked.png";
export default function LikeButton() {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (event) => {
        event.preventDefault();
        // TODO: Send request to server to like/unlike the post
        if (isLiked) {
            setLikeCount(likeCount - 1);
            setIsLiked(false);
        } else {
            setLikeCount(likeCount + 1);
            setIsLiked(true);
        }
    };

    return (
        <div className="flex items-center mt-4 space-x-4">
            <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-500 font-medium px-2 py-1 rounded"
                onClick={handleLike}
            >
                <img
                    src={isLiked ? LikedIcon : LikeIcon}
                    alt="Like Icon"
                    className="mr-1.5 w-5 h-5 mt-0.5"
                />
                {likeCount}
            </button>
        </div>
    );
}

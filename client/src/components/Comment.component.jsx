import ReplyButton from "./ReplyButton.component";
import UserProfile from "../assets/profile-user.png";
import LikeButton from "./LikeButton.component";
import { useEffect, useState } from "react";
import api from "../services/api.service";

export default function Comment({ styles, userId, dateTime, comment }) {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        api.get(`/user/public/profile/${userId}`).then((response) => {
            setUserInfo(response.data.data);
        });
    }, [userId]);

    return (
        <article
            className={`p-6 text-base bg-white rounded-lg dark:bg-gray-900 ${styles}`}
        >
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full bg-white"
                            src={UserProfile}
                            alt={userInfo.fullName}
                        />
                        {userInfo.fullName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dateTime}
                    </p>
                </div>
                <button
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-50  dark:bg-red-700 dark:hover:bg-red-900 dark:focus:ring-red-400"
                    type="button"
                >
                    Delete
                </button>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment}</p>
            <div className="flex gap-5 flex-wrap">
                <LikeButton />
                <ReplyButton />
            </div>
        </article>
    );
}

import { useEffect, useState } from "react";
import Card from "../components/Card.component";
import api from "../services/api.service";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const userId = String(localStorage.getItem("_id"));

    useEffect(() => {
        api.get(`/blog/user/${userId}`)
            .then((response) => {
                const apiResponse = response.data;
                setBlogs(apiResponse.data.blogs);
            })
            .catch((error) => {
                toast.error("Bad Request! Unable to retrieve blogs.");
                console.error(error);
            });
    }, [userId]);

    return (
        <div>
            <Card blogs={blogs} isUpdateRequest={true} />
        </div>
    );
}

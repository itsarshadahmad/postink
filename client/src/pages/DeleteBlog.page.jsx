import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api.service";
import { toast } from "react-toastify";

export default function DeleteBlog() {
    const navigate = useNavigate();
    const params = useParams();
    const blogId = params.blogId;
    const userId = String(localStorage.getItem("_id"));

    useEffect(() => {
        api.delete(`/blog/delete/${blogId}`, { _id: userId })
            .then((response) => {
                const apiResponse = response.data;
                toast.success(apiResponse.message);
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
                navigate("/");
            });
    }, [blogId, navigate, userId]);

    return <></>;
}

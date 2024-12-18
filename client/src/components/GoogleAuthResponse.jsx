import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { login } from "../store/authSlice";
import { useEffect } from "react";

export default function GoogleAuthResponse() {
    const [params] = useSearchParams();
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const _id = params.get("_id");
    const fullName = params.get("fullName");
    const email = params.get("email");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            [accessToken, refreshToken, fullName, email, _id].some(
                (item) => !item
            )
        ) {
            toast.error("Something went wrong");
            return navigate("/signin");
        }

        dispatch(login({ accessToken, refreshToken, fullName, email, _id }));
        toast.success("Successfully authenticated");
        return navigate("/");
    }, []);

    return <div></div>;
}

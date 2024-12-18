import { Link, useNavigate } from "react-router";
import Input from "../components/Input.component";
import UploadImage from "../components/UploadImage.component";
import { useForm } from "react-hook-form";
import api from "../services/api.service.js";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signup } from "../store/authSlice.js";

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const [showError, setShowError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setShowError("");
        const { email, password, fullName, avatar } = data;
        api.post(
            "/user/signup",
            {
                email,
                password,
                fullName,
                avatar: avatar[0],
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
            .then((response) => {
                const data = response.data.data;
                const { success } = response.data;
                toast.success("Successfully Authenticated");
                dispatch(signup(data));
                if (success) navigate("/");
            })
            .catch((error) => {
                const errorResponse = error.response.data;
                setShowError(errorResponse.message);
                toast.error(
                    errorResponse.message ||
                        "Something went wrong, please try again."
                );
            });
    };

    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-2">
                    Create New Account
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Input
                            type={"text"}
                            label={"Full Name *"}
                            {...register("fullName", { required: true })}
                        />
                        <Input
                            type={"email"}
                            label={"Email address *"}
                            {...register("email", { required: true })}
                        />
                        <Input
                            type={"password"}
                            label={"Password *"}
                            {...register("password", { required: true })}
                        />
                        <UploadImage
                            label={"Avatar"}
                            {...register("avatar", { required: false })}
                        />
                    </div>
                    <p className="text-sm text-red-600 mt-2">{showError}</p>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already have account?{" "}
                    <Link
                        to="/signin"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

import { Link, useNavigate } from "react-router";
import Input from "../components/Input.component";
import { useForm } from "react-hook-form";
import api from "../services/api.service.js";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

export default function Signin() {
    const { register, handleSubmit } = useForm();
    const [showError, setShowError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setShowError("");
        const { email, password } = data;
        api.post("/user/login", {
            email,
            password,
        })
            .then((response) => {
                const data = response.data.data;
                const { success } = response.data;
                toast.success("Successfully Authenticated");
                // TODO: Add few data point to for initial authentication
                dispatch(login(data));
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
                    Sign in to your account
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
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
                        <p className="text-sm text-red-600 mt-2">{showError}</p>
                        <div className="text-sm flex justify-end">
                            <Link
                                to="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500 mt-1"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <ToastContainer />
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Don&#39;t have account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Create New Account
                    </Link>
                </p>
            </div>
        </div>
    );
}

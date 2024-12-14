import { Link } from "react-router";
import Input from "../components/Input.component";

export default function Signin() {
    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-2">
                    Sign in to your account
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <Input type={"email"} label={"Email address *"} />
                        <Input type={"password"} label={"Password *"} />
                        <div className="text-sm flex justify-end">
                            <Link
                                to="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500 mt-1"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>
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

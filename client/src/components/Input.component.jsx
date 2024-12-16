import { forwardRef } from "react";

export default forwardRef(function Input({ label, type, ...props }, ref) {
    return (
        <div className="my-2" {...props}>
            <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={type}
                    name={type}
                    type={type}
                    ref={ref}
                    required
                    autoComplete={type}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-gray-400"
                />
            </div>
        </div>
    );
});

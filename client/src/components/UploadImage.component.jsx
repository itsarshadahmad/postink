import { forwardRef } from "react";

export default forwardRef(function UploadImage({ label, ...props }, ref) {
    return (
        <div className=" w-full">
            <div className="min-w-md mx-auto">
                <label className="block text-sm/6 font-medium text-gray-900 mb-2">
                    {label}
                </label>
                <input
                    type="file"
                    ref={ref}
                    {...props}
                    className="w-full text-gray-600 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-600 rounded"
                />
                <p className="text-xs text-gray-500 mt-2">
                    * PNG & JPG are Allowed.
                </p>
            </div>
        </div>
    );
});

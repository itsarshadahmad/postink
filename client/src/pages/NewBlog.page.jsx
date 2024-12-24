import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import Input from "../components/Input.component";
import { useForm } from "react-hook-form";
import UploadImage from "../components/UploadImage.component";
import api from "../services/api.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function NewBlog() {
    const { register, handleSubmit } = useForm();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Start typings...",
        }),
        []
    );

    const onSubmit = (data) => {
        api.post("/blog/new", { ...data, content })
            .then((response) => {
                toast.success("Blog Created Successfully!");
                setContent("");
                navigate("/dashboard");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 m-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Blog Title"
                    type="text"
                    {...register("title", { required: true })}
                    className="mb-2"
                />

                <UploadImage label="Upload Cover" {...register("coverImage")} />

                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    // onChange={(newContent) => {}}
                    className="mt-4"
                />

                <button
                    type="submit"
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create
                </button>
            </form>
        </div>
    );
}

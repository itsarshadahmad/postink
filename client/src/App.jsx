import { useEffect, useState } from "react";
import Card from "./components/Card.component";
import api from "./services/api.service.js";
import Pagination from "./components/Pagination.component.jsx";
import { useSearchParams } from "react-router";
import Input from "./components/Input.component.jsx";
import { useForm } from "react-hook-form";

function App() {
    const [params] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountOfBlogs, setTotalCountOfBlogs] = useState(1);
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        api.get(`/blog?page=${params.get("page")}`).then((response) => {
            const apiResponse = response.data;
            setTotalPages(apiResponse.data.totalPages);
            setTotalCountOfBlogs(apiResponse.data.totalCountOfBlogs);
            setBlogs(apiResponse.data.blogs);
        });
    }, [params]);

    const onSubmitSearch = (data) => {
        console.log(data);
    };

    return (
        <div>
            {/* := TODO: Search, edit */}
            <form
                className="flex justify-center"
                onSubmit={handleSubmit(onSubmitSearch)}
            >
                <Input
                    type="search"
                    placeholder="🔍 Search"
                    {...register("search")}
                />
            </form>
            <Card blogs={blogs} />
            <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                totalCountOfBlogs={totalCountOfBlogs}
            />
        </div>
    );
}

export default App;

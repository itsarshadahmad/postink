import { useEffect, useState } from "react";
import Card from "./components/Card.component";
import api from "./services/api.service.js";
import Pagination from "./components/Pagination.component.jsx";
import { useSearchParams } from "react-router";

function App() {
    const [params] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCountOfBlogs, setTotalCountOfBlogs] = useState();

    useEffect(() => {
        api.get(`/blog?page=${params.get("page")}`).then((response) => {
            const apiResponse = response.data;
            setTotalPages(apiResponse.data.totalPages);
            setTotalCountOfBlogs(apiResponse.data.totalCountOfBlogs);
            setBlogs(apiResponse.data.blogs);
        });
    }, [params]);
    return (
        <div>
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

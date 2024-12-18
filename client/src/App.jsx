import { useEffect, useState } from "react";
import Card from "./components/Card.component";
import api from "./services/api.service.js";

function App() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        api.get("/blog").then((response) => {
            const apiResponse = response.data;
            setBlogs(apiResponse.data.blogs);
        });
    }, []);
    return (
        <div>
            <Card blogs={blogs} />
        </div>
    );
}

export default App;

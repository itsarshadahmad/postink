import App from "../App";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../Layout";
import PageNotFound from "../pages/404.page";
import Signin from "../pages/Signin.page";
import Signup from "../pages/Signup.page";
import GoogleAuthResponse from "../components/GoogleAuthResponse";
import Blog from "../pages/Blog.page";
import Dashboard from "../pages/Dashboard.page";
import NewBlog from "../pages/NewBlog.page";
import DeleteBlog from "../pages/DeleteBlog.page";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="page?" element={<App />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route
                        path="auth/google"
                        element={<GoogleAuthResponse />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="blog">
                        <Route path=":_id" element={<Blog />} />
                        <Route path="new" element={<NewBlog />} />
                        <Route path="delete/:blogId" element={<DeleteBlog />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;

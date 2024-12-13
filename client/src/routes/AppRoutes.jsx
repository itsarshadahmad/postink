import App from "../App";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../Layout";
import PageNotFound from "../pages/404.page";
import Signin from "../pages/Signin.page";
import Signup from "../pages/Signup.page";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<App />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="user">
                        <Route index element={<h1>User</h1>} />
                    </Route>
                    <Route path="test" element={<></>} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;

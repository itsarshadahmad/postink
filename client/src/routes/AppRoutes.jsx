import App from "../App";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../Layout";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<App />} />
                    <Route path="login" element={<h1>Login</h1>} />
                    <Route path="signup" element={<h1>Signup</h1>} />
                    <Route path="user">
                        <Route index element={<h1>User</h1>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;

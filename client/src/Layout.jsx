import Navbar from "./components/header/Navbar.component";
import { Outlet } from "react-router";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;

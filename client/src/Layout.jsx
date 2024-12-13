import Navbar from "./components/header/Navbar.component";
import Footer from "./components/footer/Footer.component";
import { Outlet } from "react-router";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;

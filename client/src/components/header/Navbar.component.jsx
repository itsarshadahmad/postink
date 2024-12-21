import { useCallback, useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api.service.js";
import { logout } from "../../store/authSlice.js";
import { ToastContainer } from "react-toastify";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const logoutUser = useCallback(
        (event) => {
            event.preventDefault();
            const _id = localStorage.getItem("_id");
            api.post("/user/logout", { _id })
                .then((response) => {
                    const data = response.data;
                    if (data.success) {
                        dispatch(logout());
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [dispatch]
    );

    const navigations = [
        { text: "Dashboard", navTo: "/dashboard" },
        { text: "Create", navTo: "/blog/new" },
        { text: "Settings", navTo: "/settings" },
    ];

    return (
        <header className="bg-white">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <p className="text-lg font-semibold	text-gray-700">
                            Post Ink
                        </p>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    {isAuthenticated &&
                        navigations.map((nav, index) => (
                            <div key={index}>
                                <Link
                                    key={index}
                                    to={nav.navTo}
                                    className="text-sm/6 font-semibold text-gray-900"
                                >
                                    {nav.text}
                                </Link>
                            </div>
                        ))}
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!isAuthenticated ? (
                        <NavLink
                            to="/signin"
                            className="text-sm/6 font-semibold text-gray-900"
                        >
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </NavLink>
                    ) : (
                        <button
                            className="text-sm/6 font-semibold text-white bg-red-500 py-1 px-3 rounded-full shadow-sm drop-shadow-sm hover:bg-red-700"
                            onClick={(e) => logoutUser(e)}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <div className="flex lg:flex-1">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <p className="text-xl font-semibold	text-gray-700">
                                    Post Ink
                                </p>
                            </Link>
                        </div>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {isAuthenticated &&
                                    navigations.map((nav, index) => (
                                        <div key={index}>
                                            <NavLink
                                                key={index}
                                                to={nav.navTo}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {nav.text}
                                            </NavLink>
                                        </div>
                                    ))}
                            </div>
                            <div className="py-6">
                                {!isAuthenticated ? (
                                    <NavLink
                                        to="/signin"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Sign in{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </NavLink>
                                ) : (
                                    <button
                                        className="-mx-3 w-full block text-base/7  font-semibold text-white bg-red-500 py-1 px-3 rounded-full shadow-sm drop-shadow-sm hover:bg-red-700"
                                        onClick={(e) => logoutUser(e)}
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
            <ToastContainer />
        </header>
    );
}

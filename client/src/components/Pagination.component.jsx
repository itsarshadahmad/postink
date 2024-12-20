import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function Pagination({
    setPage,
    page,
    totalPages,
    totalCountOfBlogs,
}) {
    // Styles for pagination buttons
    const activePageStyles =
        "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    const inactivePageStyles =
        "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
    const inactiveButtonStyles =
        "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
    const activeButtonStyles =
        "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 text-black";

    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        setPage(params.get("page") || 1);
    }, [params, setPage]);

    const startIndex = (page - 1) * 10 + 1;
    const endIndex = Math.min(startIndex + 10 - 1, totalCountOfBlogs);

    const handlePageChange = (index) => {
        setPage(index);
        navigate(`?page=${index}`);
    };

    const handlePreviousPageButton = (event) => {
        event.preventDefault();
        if (page > 1) {
            return handlePageChange(page - 1);
        }
        return;
    };

    const handleNextPageButton = (event) => {
        event.preventDefault();
        if (page < totalPages) {
            return handlePageChange(Number.parseInt(page) + 1);
        }
        return;
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={handlePreviousPageButton}
                >
                    Previous
                </button>
                <button
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={handleNextPageButton}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{startIndex}</span> to{" "}
                        <span className="font-medium">{endIndex}</span> of{" "}
                        <span className="font-medium">{totalCountOfBlogs}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                    >
                        <button
                            className={
                                page > 1
                                    ? activeButtonStyles
                                    : inactiveButtonStyles
                            }
                            onClick={handlePreviousPageButton}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => {
                            return (
                                <button
                                    onClick={() => handlePageChange(i + 1)}
                                    key={i + 1}
                                    className={
                                        page == i + 1
                                            ? activePageStyles
                                            : inactivePageStyles
                                    }
                                >
                                    {i + 1}
                                </button>
                            );
                        })}

                        <button
                            to="#"
                            className={
                                page < totalPages
                                    ? activeButtonStyles
                                    : inactiveButtonStyles
                            }
                            onClick={handleNextPageButton}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

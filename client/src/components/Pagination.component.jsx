import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
    inactiveNextButtonStyles,
    activeNextButtonStyles,
    activePageStyles,
    activePrevButtonStyles,
    inactivePageStyles,
    inactivePrevButtonStyles,
} from "./Pagination.styles";

export default function Pagination({
    setPage,
    page,
    totalPages,
    totalCountOfBlogs,
}) {
    // Styles for pagination buttons

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
                                    ? activePrevButtonStyles
                                    : inactivePrevButtonStyles
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
                                    ? activeNextButtonStyles
                                    : inactiveNextButtonStyles
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

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white shadow dark:bg-gray-800 p-4 fixed bottom-0 w-full">
            <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                © {year} Blog App. All Rights Reserved.
            </p>
        </footer>
    );
}

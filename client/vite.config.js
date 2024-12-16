import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";

config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env,
    },
    // server: {
    //     proxy: {
    //         // "/api": process.env.VITE_API_URL,
    //         "/api": {
    //             // target: process.env.VITE_API_URL,
    //             target: "http://localhost:8000/api",
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ""),
    //         },
    //     },
    // },
});

import { createSlice } from "@reduxjs/toolkit";

function checkAuthentication() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const _id = localStorage.getItem("_id");
    const email = localStorage.getItem("email");
    if ([email, _id, refreshToken].some((item) => !item)) {
        localStorage.clear();
        return {
            isAuthenticated: false,
            user: {},
        };
    }
    return {
        isAuthenticated: true,
        user: {
            _id,
            email,
            accessToken,
            refreshToken,
        },
    };
}

const initialState = checkAuthentication();

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const user = {
                _id: action.payload._id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                avatar: action.payload?.avatar,
                blogs: action.payload.blogs,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
            localStorage.setItem("accessToken", action.payload?.accessToken);
            localStorage.setItem("refreshToken", action.payload?.refreshToken);
            localStorage.setItem("email", action.payload?.email);
            localStorage.setItem("_id", action.payload?._id);

            state.user = user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            if (state.isAuthenticated) {
                state.isAuthenticated = false;
                state.user = {};
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("_id");
                localStorage.removeItem("email");
            }
        },
        signup: (state, action) => {
            const user = {
                _id: action.payload._id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                avatar: action.payload?.avatar,
                blogs: action.payload.blogs,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
            localStorage.setItem("accessToken", action.payload?.accessToken);
            localStorage.setItem("refreshToken", action.payload?.refreshToken);

            state.user = user;
            state.isAuthenticated = true;
        },
    },
});

export const { login, logout, signup, removeAuth } = authSlice.actions;

export default authSlice.reducer;

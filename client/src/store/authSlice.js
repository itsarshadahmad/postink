import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {},
};

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
            };
            state.user = user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            if (state.isAuthenticated) {
                state.auth = false;
                state.user = {};
            }
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

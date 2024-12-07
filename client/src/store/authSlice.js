import { createSlice, nanoid } from "@reduxjs/toolkit";

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
                id: nanoid(),
                fullName: action.payload.fullName,
                email: action.payload.email,
                avatar: action.payload.avatar,
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

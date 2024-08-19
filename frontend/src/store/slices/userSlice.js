import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loggingIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: () => {
            return {
                loggingIn: true,
                error: null,
                isAuthenticated: false,
                user: null,
            };
        },
        loginSuccess: (state, action) => {
            return {
                loggingIn: false,
                error: null,
                isAuthenticated: true,
                user: action.payload,
            };
        },
        loginFailure: (state, action) => {
            return {
                loggingIn: false,
                error: action.payload,
                isAuthenticated: false,
                user: null,
            };
        },
        updateStart: (state) => {
            return {
                ...state,
                loggingIn: true,
                error: null,
            };
        },
        updateSuccess: (state, action) => {
            return {
                loggingIn: false,
                error: null,
                isAuthenticated: true,
                user: action.payload,
            };
        },
        updateFailure: (state, action) => {
            return {
                loggingIn: false,
                error: action.payload,
                isAuthenticated: true,
                user: state.user,
            };
        },

        deletionStart: (state) => {
            return {
                ...state,
                loggingIn: true,
                error: null,
            };
        },
        deletionSuccess: () => {
            return {
                loggingIn: false,
                error: null,
                isAuthenticated: false,
                user: null,
            };
        },
        deletionFailure: (state, action) => {
            return {
                loggingIn: false,
                error: action.payload,
                isAuthenticated: true,
                user: state.user,
            };
        },

        logout: () => {
            return {
                loggingIn: false,
                error: null,
                isAuthenticated: false,
                user: null,
            };
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateStart,
    updateFailure,
    updateSuccess,
    deletionStart,
    deletionFailure,
    deletionSuccess,
} = userSlice.actions;
export default userSlice.reducer;

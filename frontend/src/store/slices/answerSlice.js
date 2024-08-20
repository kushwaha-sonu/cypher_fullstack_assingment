import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    answers: null,
    score: [],
    success: false,

};

export const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        answerStart: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        answerSuccess: (state, action) => {
            return {
                loading: false,
                error: null,
                answers: action.payload,
                success: true,
            };
        },
        answerFailure: (state, action) => {
            return {
                loading: false,
                error: action.payload,
                answers: null,
                success: false,
            };
        },
        scoreSuccess: (state, action) => {
            return {
                loading: false,
                error: null,
                score: action.payload,
                success: true,
            };
        },
        scoreFailure: (state, action) => {
            return {
                loading: false,
                error: action.payload,
                score: null,
                success: false,
            };
        },
    },
});

export const { answerStart, answerSuccess, answerFailure, scoreSuccess, scoreFailure } = answerSlice.actions;

export  default answerSlice.reducer;
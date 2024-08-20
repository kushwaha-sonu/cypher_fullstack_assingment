import { combineReducers } from "redux";
import { userSlice } from "../slices/userSlice";
import {answerSlice} from "../slices/answerSlice.js";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    answer: answerSlice.reducer,

});

export default rootReducer;

import { configureStore } from "@reduxjs/toolkit";
import { storiesReducer } from "./storiesSlice";
import { userReducer } from "./userSlice";


export const store = configureStore({
    reducer: { stories: storiesReducer, user: userReducer }
});

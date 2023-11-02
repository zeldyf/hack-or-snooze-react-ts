import { storiesSlice } from "./storiesSlice";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { store } from "./storeIndex"
import { userSlice } from "./userSlice";

export type RootState = {
    stories: ReturnType<typeof storiesSlice.reducer>,
    user: ReturnType<typeof userSlice.reducer>
}

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export interface User {
    user: {
        createdAt: string;
        favorites: StoryObj[];
        name: string;
        stories: StoryObj[];
        updatedAt: string;
        username: string;
    };
}

export interface StoryObj {
    author: string;
    createdAt: string;
    storyId: string;
    title: string;
    updatedAt: string;
    url: string;
    username: string;
}

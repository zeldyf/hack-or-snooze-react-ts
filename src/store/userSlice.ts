import { createSlice } from "@reduxjs/toolkit";
import { autoLogin, signup, loginUser } from "./fetchUser";
import { addOrDeleteFavorite, deleteStory, newStory } from "./fetchStories";
import { StoryObj } from "./types";

const initialState = {
    createdAt: "",
    favorites: [] as StoryObj[],
    name: "",
    stories: [] as StoryObj[],
    updatedAt: "",
    username: "",
    status: "idle",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.createdAt = "";
            state.favorites = [];
            state.name = "";
            state.stories = [];
            state.updatedAt = "";
            state.username = "";
            state.status = "idle";

            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading"
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.username = action.payload.user.username;
                state.updatedAt = action.payload.user.updatedAt;
                state.createdAt = action.payload.user.createdAt;
                state.favorites = action.payload.user.favorites;
                state.name = action.payload.user.name;
                state.stories = action.payload.user.stories;
                state.status = "succeeded"

                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('username', action.payload.user.username);
            })
            .addCase(signup.rejected, (state) => {
                state.status = "failed"
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.username = action.payload.user.username;
                state.updatedAt = action.payload.user.updatedAt;
                state.createdAt = action.payload.user.createdAt;
                state.favorites = action.payload.user.favorites;
                state.name = action.payload.user.name;
                state.stories = action.payload.user.stories;
                state.status = "succeeded"

                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('username', action.payload.user.username);
                console.log(localStorage)
            })
            .addCase(autoLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.username = action.payload.user.username;
                state.updatedAt = action.payload.user.updatedAt;
                state.createdAt = action.payload.user.createdAt;
                state.favorites = action.payload.user.favorites;
                state.name = action.payload.user.name;
                state.stories = action.payload.user.stories;
                state.status = "succeeded"
            })
            .addCase(newStory.fulfilled, (state, action) => {
                console.log(action.payload)
                state.stories.push(action.payload.story)
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                console.log(action.payload.story.storyId)
                state.stories = state.stories.filter(story => story.storyId !== action.payload.story.storyId)
            })
            .addCase(addOrDeleteFavorite.fulfilled, (state, action) => {
                state.favorites = action.payload.user.favorites
            });
    },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
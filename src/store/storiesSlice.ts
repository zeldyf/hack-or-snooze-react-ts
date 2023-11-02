import { createSlice } from "@reduxjs/toolkit";
import fetchStories, { deleteStory, newStory } from "../fetchStories";
import { StoryObj } from "./types"

export const storiesSlice = createSlice({
    name: 'stories',
    initialState: {
        data: [] as StoryObj[],
        loading: false
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(newStory.fulfilled, (state, action) => {
                state.data.unshift(action.payload.story)
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                state.data = state.data.filter(story => story.storyId !== action.payload.story.storyId)
            })
    }
})

export const storiesReducer = storiesSlice.reducer;
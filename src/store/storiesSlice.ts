import { createSlice } from "@reduxjs/toolkit";
import fetchStories from "../fetchStories";
import { StoryObj } from "../UserContext";

export const storiesSlice = createSlice({
    name: 'stories',
    initialState: {
        data: [] as StoryObj[],
        loading: false
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
    }
})

export const storiesReducer = storiesSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

export const fetchStories = createAsyncThunk(
  `stories/fetchStories`,
  async () => {
    const response = await fetch(BASE_URL + "/stories").then((response) =>
      response.json()
    );
    console.log(response.stories)
    return response.stories
  }
);

export default fetchStories;

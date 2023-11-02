import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
const storedUsername = localStorage.getItem("username");
const storedToken = localStorage.getItem("token");

export const fetchStories = createAsyncThunk(
  `stories/fetchStories`,
  async () => {
    const response = await fetch(BASE_URL + "/stories").then((response) =>
      response.json()
    );
    console.log(response.stories);
    return response.stories;
  }
);

export const newStory = createAsyncThunk(
  "stories/newStory",
  async ({
    author,
    title,
    url,
  }: {
    author: string;
    title: string;
    url: string;
  }) => {
    const response = await fetch(BASE_URL + "/stories", {
      method: "POST",
      body: JSON.stringify({
        token: storedToken,
        story: {
          author,
          title,
          url,
        },
      }),
    });
    if (!response.ok) {
      throw new Error("New story failed");
    }

    const storyData = await response.json();
    console.log("New story added", storyData);
    return storyData;
  }
);

export const addOrDeleteFavorite = createAsyncThunk(
  "stories/addOrDeleteFavorite",
  async ({
    fetchMethod,
    storyId,
  }: {
    fetchMethod: "add" | "delete";
    storyId: string;
  }) => {
    const response = await fetch(
      `${BASE_URL}/users/${storedUsername}/favorites/${storyId}`,
      {
        method: fetchMethod === "add" ? "POST" : "DELETE",
        body: JSON.stringify({
          token: storedToken,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`${fetchMethod} favorite failed`);
    }
    const userData = await response.json();
    return userData;
  }
);

export const deleteStory = createAsyncThunk(
  "stories/deleteStory",
  async ({ storyId }: { storyId: string }) => {
    const response = await fetch(`${BASE_URL}/stories/${storyId}`, {
      method: "DELETE",
      body: JSON.stringify({
        token: storedToken,
      }),
    });
    if (!response.ok) {
      throw new Error("Delete failed");
    }
    const userData = await response.json();
    return userData;
  }
);

export default fetchStories;

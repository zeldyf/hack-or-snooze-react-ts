import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

export const signup = createAsyncThunk(
  `user/signup`,
  async ({
    username,
    password,
    name,
  }: {
    username: string;
    password: string;
    name: string;
  }) => {
    const response = await fetch(BASE_URL + "/signup", {
      method: "POST",
      body: JSON.stringify({
        user: {
          password,
          username,
          name,
        },
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const userData = await response.json();
    console.log("User data on signup:", userData);

    return userData;
  }
);

export const loginUser = createAsyncThunk(
  `user/login`,
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(BASE_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        user: {
          password,
          username,
        },
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const userData = await response.json();
    console.log("User data on login:", userData);

    return userData;
  }
);

export const autoLogin = createAsyncThunk("user/autoLogin", async () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users/${username}?token=${token}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }

  const userData = await response.json();
  console.log("User data on login:", userData);

  return userData;
});

export default loginUser;

import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { BASE_URL } from "./fetchStories";
import { useNavigate } from "react-router-dom";

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

interface AuthContextProps {
  user: User;
  ownStories: StoryObj[];
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  newStory: (author: string, title: string, url: string) => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
  updateUser: () => Promise<User>;
  addOrDeleteFavorite: (
    fetchMethod: "add" | "delete",
    storyId: string
  ) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    user: {
      createdAt: "",
      favorites: [],
      name: "",
      stories: [],
      updatedAt: "",
      username: "",
    },
  });
  const [ownStories, setOwnStories] = useState<StoryObj[]>([]);
  const isLoggedIn = localStorage.length !== 0;
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");
  const navigate = useNavigate();

  const autoLogin = async () => {
    if (storedToken && storedUsername) {
      try {
        const updatedUser = await updateUser();
        setUser(updatedUser);
      } catch (error) {
        console.error("Auto login failed:", error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      console.log(isLoggedIn);
      await autoLogin();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => console.log("User after update", user), [user]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("User data on login:", userData);
        setUser({ user: userData.user });
        saveCredentialsinLocalStorage(userData.token, userData.user.username);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (username: string, password: string, name: string) => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            password,
            name,
          },
        }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser({ user: userData.user });
        saveCredentialsinLocalStorage(userData.token, userData.user.username);
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveCredentialsinLocalStorage = (token: string, username: string) => {
    console.debug("saveUserCredentialsInLocalStorage");
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    console.log(localStorage);
  };

  const logout = () => {
    setUser({
      user: {
        createdAt: "",
        favorites: [],
        name: "",
        stories: [],
        updatedAt: "",
        username: "",
      },
    });
    setOwnStories([]);
    localStorage.clear();
    console.log(isLoggedIn);
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${storedUsername}?token=${storedToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const userData: User = await response.json();
        console.log(userData);

        return userData;
      } else {
        throw new Error("User update failed");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const newStory = async (author: string, title: string, url: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          story: {
            author,
            title,
            url,
          },
        }),
      });
      if (response.ok) {
        const storyData: {
          story: {
            author: string;
            createdAt: string;
            storyId: string;
            title: string;
            updatedAt: string;
            url: string;
            username: string;
          };
        } = await response.json();
        setOwnStories((prevStories) => [...prevStories, storyData.story]);
        const updatedUser = await updateUser();
        setUser((prevUser) => ({
          user: {
            ...prevUser.user,
            stories: updatedUser.user.stories,
          },
        }));
        navigate("/");
      } else {
        throw new Error("Story submit failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStory = async (storyId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/stories/${storyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: storedToken,
        }),
      });
      if (response.ok) {
        const updatedUser = await updateUser();
        setUser((prevUser) => ({
          user: {
            ...prevUser.user,
            stories: updatedUser.user.stories,
          },
        }));
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrDeleteFavorite = async (
    fetchMethod: "add" | "delete",
    storyId: string
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${storedUsername}/favorites/${storyId}`,
        {
          method: fetchMethod === "add" ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: storedToken,
          }),
        }
      );
      if (response.ok) {
        const updatedUser = await updateUser();
        setUser((prevUser) => ({
          user: {
            ...prevUser.user,
            favorites: updatedUser.user.favorites,
          },
        }));
      } else {
        throw new Error("Favorite failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ownStories,
        isLoggedIn,
        login,
        signup,
        logout,
        newStory,
        deleteStory,
        updateUser,
        addOrDeleteFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import AccountForms from "./AccountForms";
import fetchStories from "./fetchStories";
import StoryList from "./StoryList";
import StoryForm from "./StoryForm";
import Favorites from "./Favorites";
import MyStories from "./MyStories";
import { AppDispatch, RootState } from "./store/types";
import { autoLogin } from "./fetchUser";

export const isLoggedIn = localStorage.length !== 0;

function App() {
  const stories = useSelector((state: RootState) => state.stories.data);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(autoLogin());
    console.log("reload");
    navigate("/home");
    dispatch(fetchStories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navbar loggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/home"
          element={<StoryList stories={stories} loggedIn={isLoggedIn} />}
        />
        <Route path="/login" element={<AccountForms />} />
        <Route path="/submit" element={<StoryForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/mystories" element={<MyStories />} />
      </Routes>
    </div>
  );
}

export default App;

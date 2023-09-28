import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AccountForms from "./AccountForms";
import fetchStories from "./fetchStories";
import StoryList from "./StoryList";
import StoryForm from "./StoryForm";
import Favorites from "./Favorites";
import { StoryObj, useUser } from "./UserContext";
import MyStories from "./MyStories";

function App() {
  const [stories, setStories] = useState<StoryObj[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storiesData: StoryObj[] = await fetchStories();
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navbar loggedIn={isLoggedIn} />
      <Routes>
        <Route path="/home" element={<StoryList stories={stories} />} />
        <Route path="/login" element={<AccountForms />} />
        <Route path="/submit" element={<StoryForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/mystories" element={<MyStories />} />
      </Routes>
    </div>
  );
}

export default App;

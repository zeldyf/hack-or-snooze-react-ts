import { StoryObj } from "./store/types";
import Story from "./Story";
import "./css/stories.css";
import { isLoggedIn } from "./App";
import { useSelector } from "react-redux";
import { RootState } from "./store/types";

function Favorites() {
  const favorites = useSelector((state: RootState) => state.user.favorites);

  const isFavorite = (story: StoryObj) => {
    return favorites.some((favorite: StoryObj) => {
      return favorite.storyId === story.storyId;
    });
  };

  return (
    <ol className="stories-list">
      {favorites.length ? (
        favorites.map((story: StoryObj) => (
          <Story
            story={story}
            key={story.storyId}
            isFavorite={isFavorite(story)}
            loggedIn={isLoggedIn}
            source="favorites"
          />
        ))
      ) : (
        <h5>No favorites added by user yet!</h5>
      )}
    </ol>
  );
}

export default Favorites;

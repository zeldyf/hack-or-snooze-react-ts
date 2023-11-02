import { StoryObj } from "../store/types";
import Story from "./Story";
import "../css/stories.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import { isLoggedIn } from "./App";

function StoryList({
  stories,
  loggedIn,
}: {
  stories: StoryObj[];
  loggedIn: boolean;
}) {
  const favorites = useSelector((state: RootState) => state.user.favorites);

  const isFavorite = (story: StoryObj) => {
    return favorites.some((favorite: StoryObj) => {
      return favorite.storyId === story.storyId;
    });
  };

  return (
    <ol className="stories-list">
      {stories.map((story) => (
        <Story
          story={story}
          key={story.storyId}
          isFavorite={isFavorite(story)}
          loggedIn={isLoggedIn()}
          source="storylist"
        />
      ))}
    </ol>
  );
}

export default StoryList;

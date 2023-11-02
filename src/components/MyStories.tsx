import { useSelector } from "react-redux";
import { StoryObj } from "../store/types";
import "../css/stories.css";
import { RootState } from "../store/types";
import Story from "./Story";

function MyStories() {
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const stories = useSelector((state: RootState) => state.user.stories);

  const isFavorite = (story: StoryObj) => {
    return favorites.some((favorite: StoryObj) => {
      return favorite.storyId === story.storyId;
    });
  };

  return (
    <ol className="stories-list">
      {stories.length ? (
        stories.map((story: StoryObj) => (
          <Story
            story={story}
            key={story.storyId}
            isFavorite={isFavorite(story)}
            loggedIn={true}
            source="userstory"
          />
        ))
      ) : (
        <h5>No stories added by user yet!</h5>
      )}
    </ol>
  );
}

export default MyStories;

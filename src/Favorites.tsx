import { StoryObj, useUser } from "./UserContext";
import Story from "./Story";
import "./css/stories.css";

function Favorites() {
  const { user } = useUser();
  const favorites = user.user.favorites;

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
          />
        ))
      ) : (
        <h5>No favorites added by user yet!</h5>
      )}
    </ol>
  );
}

export default Favorites;

import { StoryObj, useUser } from "./UserContext";
import UserStory from "./UserStory";
import "./css/stories.css";

function MyStories() {
  const { user } = useUser();
  const favorites = user.user.favorites;

  const isFavorite = (story: StoryObj) => {
    return favorites.some((favorite: StoryObj) => {
      return favorite.storyId === story.storyId;
    });
  };

  return (
    <ol className="stories-list">
      {user.user.stories.length ? (
        user.user.stories.map((story: StoryObj) => (
          <UserStory
            story={story}
            key={story.storyId}
            isFavorite={isFavorite(story)}
          />
        ))
      ) : (
        <h5>No stories added by user yet!</h5>
      )}
    </ol>
  );
}

export default MyStories;

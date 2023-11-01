import { StoryObj, useUser } from "./UserContext";
import Story from "./Story";
import "./css/stories.css";

function StoryList({ stories }: { stories: StoryObj[] }) {
  console.log("load storylist");
  
  // const { ownStories, user } = useUser();

  // const isFavorite = (story: StoryObj) => {
  //   return user.user.favorites.some((favorite: StoryObj) => {
  //     return favorite.storyId === story.storyId;
  //   });
  // };

  return (
    <ol className="stories-list">
      {/* {ownStories.map((story) => (
        <Story
          story={story}
          key={story.storyId}
          isFavorite={isFavorite(story)}
        />
      ))} */}
      {stories.map((story) => (
        <Story
          story={story}
          key={story.storyId}
          isFavorite={true}
        />
      ))}
    </ol>
  );
}

export default StoryList;

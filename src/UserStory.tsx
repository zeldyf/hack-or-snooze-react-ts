import { StoryObj, useUser } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

export default function UserStory({
  story,
  isFavorite,
}: {
  story: StoryObj;
  isFavorite: boolean;
}) {
  const { addOrDeleteFavorite, deleteStory } = useUser();
  const url = new URL(story.url);
  const hostname = `(${url.hostname})`;

  const handleStarClick = async (story: StoryObj) => {
    try {
      console.log("star clicked");
      const fetchMethod = isFavorite ? "delete" : "add";
      await addOrDeleteFavorite(fetchMethod, story.storyId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashClick = async (story: StoryObj) => {
    try {
      console.log("trash clicked");
      await deleteStory(story.storyId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className={story.storyId}>
      <div>
        <span className="trash-can" onClick={() => handleTrashClick(story)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
        <span className="star" onClick={() => handleStarClick(story)}>
          <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
        </span>
        <a className="story-link" href={story.url}>{story.title}</a>
        <small>{hostname}</small>
        <small className="story-author">by {story.author}</small>
        <small className="story-posted-by">posted by {story.username}</small>
      </div>
    </li>
  );
}

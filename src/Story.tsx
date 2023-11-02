import { StoryObj } from "./store/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarRegular,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/types";
import { addOrDeleteFavorite, deleteStory } from "./fetchStories";

export default function Story({
  story,
  isFavorite,
  loggedIn,
  source,
}: {
  story: StoryObj;
  isFavorite: boolean;
  loggedIn: boolean;
  source: "userstory" | "storylist" | "favorites";
}) {
  const url = new URL(story.url);
  const hostname = `(${url.hostname})`;
  const dispatch: AppDispatch = useDispatch();

  const handleStarClick = async (story: StoryObj) => {
    try {
      const fetchMethod = isFavorite ? "delete" : "add";
      dispatch(
        addOrDeleteFavorite({
          fetchMethod: fetchMethod,
          storyId: story.storyId,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashClick = async (story: StoryObj) => {
    try {
      dispatch(deleteStory({ storyId: story.storyId }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li id={story.storyId}>
      <div>
        {source === "userstory" && (
          <span className="trash-can" onClick={() => handleTrashClick(story)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        )}
        {loggedIn && (
          <span className="star" onClick={() => handleStarClick(story)}>
            <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
          </span>
        )}
        <a className="story-link" href={story.url}>
          {story.title}
        </a>
        <small>{hostname}</small>
        <small className="story-author">by {story.author}</small>
        <small className="story-posted-by">posted by {story.username}</small>
      </div>
    </li>
  );
}

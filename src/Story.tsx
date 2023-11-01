import { StoryObj, useUser } from "./UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

export default function Story({
  story,
  isFavorite,
}: {
  story: StoryObj;
  isFavorite: boolean;
}) {
  const url = new URL(story.url);
  const hostname = `(${url.hostname})`;
  // const { isLoggedIn, addOrDeleteFavorite } = useUser();

  const handleStarClick = async (story: StoryObj) => {
    try {
      const fetchMethod = isFavorite ? "delete" : "add";
      // await addOrDeleteFavorite(fetchMethod, story.storyId);
    } catch (error) {
      console.error(error);
    }
  };

  // if (isLoggedIn) {
  //   return (
  //     <li id={story.storyId}>
  //       <div>
  //         <span className="star" onClick={() => handleStarClick(story)}>
  //           <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
  //         </span>
  //         <a className="story-link" href={story.url}>
  //           {story.title}
  //         </a>
  //         <small>{hostname}</small>
  //         <small className="story-author">by {story.author}</small>
  //         <small className="story-posted-by">posted by {story.username}</small>
  //       </div>
  //     </li>
  //   );
  // } else {
    return (
      <li id={story.storyId}>
        <a className="story-link" href={story.url}>
          {story.title}
        </a>
        <small>{hostname}</small>
        <small className="story-author">by {story.author}</small>
        <small className="story-posted-by">posted by {story.username}</small>
      </li>
    );
  }
// }

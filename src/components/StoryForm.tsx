import { useState } from "react";
import { useDispatch } from "react-redux";
import { newStory } from "../store/fetchStories";
import { AppDispatch } from "../store/types";
import { useNavigate } from "react-router-dom";

function StoryForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    author: "",
    title: "",
    url: "",
  });

  return (
    <form
      action="#"
      className="new-story-form"
      id="story-form"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          newStory({
            author: formValues.author,
            title: formValues.title,
            url: formValues.url,
          })
        );
        setFormValues({ author: "", title: "", url: "" });
        navigate("/home");
      }}
    >
      <div className="form-field">
        <label htmlFor="create-author">author</label>
        <input
          id="create-author"
          value={formValues.author}
          required
          onChange={(e) => {
            setFormValues({ ...formValues, author: e.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="create-title">title</label>
        <input
          id="create-title"
          value={formValues.title}
          required
          onChange={(e) => {
            setFormValues({ ...formValues, title: e.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="create-url">url</label>
        <input
          id="create-url"
          value={formValues.url}
          required
          type="url"
          onChange={(e) => {
            setFormValues({ ...formValues, url: e.target.value });
          }}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default StoryForm;

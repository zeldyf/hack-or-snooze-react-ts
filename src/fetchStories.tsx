export const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

async function fetchStories(): Promise<[]> {
  const response = await fetch(`${BASE_URL}/stories`);
  const body: { stories: [] } = await response.json();
  if (body && body.stories && Array.isArray(body.stories)) {
    return body.stories;
  } else {
    throw new Error("Invalid response format");
  }
}

export default fetchStories;

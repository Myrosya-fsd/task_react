import axios from "axios";

export const fetchHits = async (query, page, signal) => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`,
    { signal }
  );
  return response.data;
};

import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://the-quality-times.herokuapp.com/api",
});

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data.topics;
};

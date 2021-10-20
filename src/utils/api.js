import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://the-quality-times.herokuapp.com/api",
});

export const getArticles = async (...params) => {
  const queries = {};

  params.forEach((param) => {
    Object.entries(param).forEach(([key, value]) => {
      queries[key] = value;
    });
  });

  const { data } = await newsApi.get("/articles", { params: queries });

  return data.articles;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data.topics;
};

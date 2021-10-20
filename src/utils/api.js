import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://the-quality-times.herokuapp.com/api",
});

export const getArticles = async (queries) => {
  const page = queries.currPage || 1;
  const limit = queries.limit || 9;
  const offset = limit * page - limit;

  const newQueries = { ...queries, page, limit, offset };

  // const queries = params[0] {limit, offset};

  // params.forEach((param) => {
  //   Object.entries(param).forEach(([key, value]) => {
  //     queries[key] = value;
  //   });
  // });

  const { data } = await newsApi.get("/articles", { params: newQueries });

  return data;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data.topics;
};

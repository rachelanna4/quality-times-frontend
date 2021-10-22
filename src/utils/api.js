import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://the-quality-times.herokuapp.com/api",
});

export const getArticles = async (queries) => {
  const page = queries.currPage || 1;
  const limit = queries.limit || 9;
  const offset = limit * page - limit;

  const newQueries = { ...queries, page, limit, offset };

  const { data } = await newsApi.get("/articles", { params: newQueries });

  return data;
};

export const getTopics = async () => {
  const { data } = await newsApi.get("/topics");
  return data.topics;
};

export const getSingleArticle = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data.article;
};

export const getCommentsByArticle = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`, {
    params: { limit: 50 },
  });
  return data;
};

export const patchArticleVotes = async (article_id, voteChange) => {
  const patchRequest = { inc_votes: voteChange };

  const { data } = await newsApi.patch(`/articles/${article_id}`, patchRequest);
  return data.votes;
};

export const postComment = async (article_id, user, commentInput) => {
  const commentRequest = { username: user, body: commentInput };

  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    commentRequest
  );

  return data.comment;
};

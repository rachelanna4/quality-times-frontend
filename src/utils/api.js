import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://the-quality-times.herokuapp.com/api",
});

export const getArticles = async (queries) => {
  const page = queries.currPage || 1;
  const limit = queries.limit || 9;

  const newQueries = { ...queries, page, limit };

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

export const getCommentsByArticle = async (article_id, currPage) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`, {
    params: { page: currPage, limit: 10 },
  });

  return data;
};

export const patchArticleVotes = async (article_id, voteChange) => {
  const patchRequest = { inc_votes: voteChange };

  const { data } = await newsApi.patch(`/articles/${article_id}`, patchRequest);
  return data.votes;
};

export const patchCommentVotes = async (comment_id, voteChange) => {
  const patchRequest = { inc_votes: voteChange };

  const { data } = await newsApi.patch(`/comments/${comment_id}`, patchRequest);
  return data.votes;
};

export const postComment = async (article_id, user, commentInput) => {
  const commentRequest = { username: user, body: commentInput.trim() };

  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    commentRequest
  );

  return data.comment;
};

export const postArticle = async (author, title, topic, body) => {
  const newArticleRequest = {
    author,
    title: title.trim(),
    topic,
    body: body.trim(),
  };

  const { data } = await newsApi.post("/articles", newArticleRequest);

  return data.article.article_id;
};

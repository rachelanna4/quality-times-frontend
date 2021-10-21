import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Nav";
import Login from "./components/Login";
import LatestNews from "./components/LatestNews";
import TopicsGallery from "./components/TopicsGallery";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import PostArticle from "./components/PostArticle";
import PostComment from "./components/PostComment";
import EditComment from "./components/EditComment";
import { useState, useEffect } from "react";
import * as api from "./utils/api";

function App() {
  const [topics, setTopics] = useState([]);
  const [isTopicError, setIsTopicError] = useState(false);

  useEffect(() => {
    setIsTopicError(false);
    api
      .getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
      })
      .catch(() => {
        setIsTopicError(true);
      });
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <LatestNews />
          <TopicsGallery topics={topics} isTopicError={isTopicError} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/articles">
          <Articles topicsList={topics} />
        </Route>
        <Route exact path="/articles/topics/:topic">
          <Articles topicsList={topics} />
        </Route>
        <Route exact path="/articles/:article_id">
          <SingleArticle />
        </Route>
        <Route exact path="/articles/:article_id/post-comment">
          <PostComment />
        </Route>
        <Route exact path="/articles/:article_id/edit-comment">
          <EditComment />
        </Route>
        <Route exact path="/post-article">
          <PostArticle />
        </Route>
      </Switch>
    </>
  );
}

export default App;

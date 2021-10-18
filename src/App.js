import "./App.css";
import { Switch, Route } from "react-router-doms";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TopicsGallery from "./components/TopicsGallery";
import Articles from "./components/Articles";
import SingleArticle from "./components/Articles";
import PostArticle from "./components/PostArticle";
import PostComment from "./components/PostComment";
import EditComment from "./components/EditComment";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <TopicsGallery />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route exact path="/articles/:topic_slug">
          <Articles />
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

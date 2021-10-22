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
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <LatestNews />
          <TopicsGallery />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route exact path="/articles/topics/:topic">
          <Articles />
        </Route>
        <Route exact path="/articles/:article_id">
          <SingleArticle />
        </Route>
        <Route exact path="/post-article">
          <PostArticle />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;

import React, { useContext } from "react";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import Navbar from "./components/Navigation/Navbar";
import PostDetailed from "./components/posts/PostDetailed";
import Posts from "./components/posts/Posts";
import UserPosts from "./components/posts/UserPosts";
import TopBanner from "./components/Utility/TopBanner";
import { authContext } from "./contexts/auth-context";

const App = () => {
  const { user } = useContext(authContext);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <TopBanner />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          {user && (
            <Route exact path="/my-posts">
              <UserPosts />
            </Route>
          )}
          <Route exact path="/posts/:post_id">
            <PostDetailed />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

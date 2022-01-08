import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import Navbar from "./components/Navigation/Navbar";
import PostDetailed from "./components/posts/PostDetailed";
import Posts from "./components/posts/Posts";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/posts/:post_id">
            <PostDetailed />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

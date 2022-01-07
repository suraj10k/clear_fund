import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import PostList from "./posts/PostList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/posts">
            <PostList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

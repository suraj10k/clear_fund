import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
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
        </Switch>
      </div>
    </Router>
  );
};

export default App;

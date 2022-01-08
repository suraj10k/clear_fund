import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Footer from "./components/Navigation/Footer";
import Navbar from "./components/Navigation/Navbar";
import Newpost from "./components/posts/Newpost";
import PostDetailed from "./components/posts/PostDetailed";
import Posts from "./components/posts/Posts";
import UserPosts from "./components/posts/UserPosts";
import TopBanner from "./components/Utility/TopBanner";
import { authContext } from "./contexts/auth-context";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
          {user && <Route exact path="/new-post">
            <Newpost />
          </Route>}
          <Redirect to="/" />
        </Switch>
        {user && (
          <NavLink activeStyle={{ display: "none" }} to="/new-post">
            <Box sx={{ position: "fixed", right: "40vw", bottom: "40px" }}>
              <Fab variant="extended" color="primary" aria-label="add">
                <AddIcon />
                &nbsp; &nbsp; add new project/campaign
              </Fab>
            </Box>
          </NavLink>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

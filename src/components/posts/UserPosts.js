import React, { useContext, useState,useEffect } from "react";
import { authContext } from "../../contexts/auth-context";
import posts from "../../data/posts";
import PostList from "./PostList";

const UserPosts = () => {
  const [data, setData] = useState(null);
  const [queried, setQueried] = useState(false);

  const { user } = useContext(authContext);

  function getData() {
      const myposts = posts.filter(post => post.creator_id === user.id);
      setData(myposts);
      setQueried(true);
  }

  useEffect(() => {
    getData();
  }, []);

  if(!queried) return <h1>Loading...</h1>
  else if(queried && !data) return <h1>No posts found.</h1>

  return <PostList posts={data} />;
};

export default UserPosts;

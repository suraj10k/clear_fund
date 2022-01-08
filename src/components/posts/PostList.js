import React from "react";
import PostCard from "./PostCard";
import "./PostList.css";

const PostList = (props) => {
  return (
    <ul className="postlist">
      {props.posts.map((post, index) => (
        <PostCard key={index} id={index} {...post} />
      ))}
    </ul>
  );
};

export default PostList;

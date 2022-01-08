import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomizedProgressBars from "./Progressbar";
import posts from "../../data/posts";
import "./PostDetailed.css";

const PostDetailed = () => {
  const [data, setData] = useState(null);
  const [queried, setQueried] = useState(false);

  const params = useParams();
  const post_id = parseInt(params.post_id);

  function getData() {
    const [post] = posts.filter((post) => post.id === post_id);
    setData(post);
    setQueried(true);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!queried) return <h1>Loading...</h1>;
  else if (!data && queried) return <h1>No posts with the given id.</h1>;

  return (
    <main style={{ margin: "5px 0" }}>
      <div
        className="image-background"
        // style={{ backgroundImage: `url(/static/images/${data.image}.jpg)` }}
        style={{ background: "dodgerblue" }}
      >
        <Typography variant="h3" mt={2}>
          {data.title}
        </Typography>

        <Typography sx={{ maxWidth: "75%" }} variant="h5" mt={5}>
          {data.description}
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <Avatar sx={{ margin: "0 10px 0 0" }}>{data.title[0]}</Avatar>
        <Typography variant="body1">{data.subheader}</Typography>
      </div>
      <hr />
      <div className="content">
        <img
          className="image"
          src={`/static/images/${data.image}.jpg`}
          alt={data.image}
        />
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
          {data.content}
        </Typography>
      </div>
      <div
        className="progress-container"
      >
        <CustomizedProgressBars
          typography_variant="h4"
          collected={data.collected}
          target={data.target}
          style={{}}
        >
            {data.collected < data.target? <Button sx={{ marginLeft: "20px" }} variant="contained">contribute</Button>:<Button sx={{ marginLeft: "20px" }} variant="contained" disabled>Target reached</Button>}
        </CustomizedProgressBars>
      </div>
    </main>
  );
};

export default PostDetailed;

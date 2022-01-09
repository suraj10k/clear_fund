import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {ethers, utils} from "ethers"
import ClearFund from "../../artifacts/contracts/clearFund.sol/clearFund.json"
import { useParams } from "react-router-dom";
import CustomizedProgressBars from "./Progressbar";
import posts from "../../data/posts";
import "./PostDetailed.css";
import { useHistory } from "react-router-dom";

const ClearFundAddress = "0x7108881aDDA033c4f1D321e6684D0788202C45e0";

const PostDetailed = () => {
  let [data, setData] = useState(null);
  let [queried, setQueried] = useState(false);
	let [account, setAccount] = useState("");
  let [allMyProjects, setMyProjects ] = useState([]);
  let [totalContribution, setTotalContributions] = useState(0);

  const history = useHistory();

  const params = useParams();
  const post_id = parseInt(params.post_id);

  function getData() {
    const [post] = posts.filter((post) => post.id === post_id);
    setData(post);
    setQueried(true);
  }

  useEffect(() => {
    setData(history.location.state);
    console.log(history.location.state);
  }, []);

  // if (!queried) return <h1>Loading...</h1>;
  if (!data) return <h1>No posts with the given id.</h1>;

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

        {/* <Typography sx={{ maxWidth: "75%" }} variant="h5" mt={5}>
          {data.description}
        </Typography> */}
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <Avatar sx={{ margin: "0 10px 0 0" }}>{data.title[0]}</Avatar>
        <Typography variant="body1">{data.subheader}</Typography>
      </div>
      <hr />
      <div className="content">
        <img
          className="image"
          src={data.image}
          alt={data.image}
          style={{ minWidth: "400px" }}
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
        </CustomizedProgressBars>
      </div>
      <div>
      {data.collected < data.target? <Button sx={{ margin: "20px" }} variant="contained">contribute</Button>:<Button sx={{ margin: "20px" }} variant="contained" disabled>Target reached</Button>}
      </div>
    </main>
  );
};

export default PostDetailed;

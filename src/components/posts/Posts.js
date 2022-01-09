import React, { useEffect, useState } from "react";
import posts_data from "../../data/posts";
import PostList from "./PostList";
import ClearFund from "../../artifacts/contracts/clearFund.sol/clearFund.json";
import { create } from "ipfs-http-client";
import { ethers, utils } from "ethers";

const ClearFundAddress = "0x7108881aDDA033c4f1D321e6684D0788202C45e0";
const client = create("https://ipfs.infura.io:5001/api/v0");

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [account, setAccount] = useState("");

  async function getProjectsFunc() {
    account = await window.ethereum.request({ method: "eth_accounts" });
    setAccount(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      ClearFundAddress,
      ClearFund.abi,
      signer
    );

    try {
      let getAllProjectsArray = await contract.getAllProjects();
      const postarray = [];
      getAllProjectsArray.forEach((project, index) => {
        postarray.push({
          id: project["OrganizationId"],
          title: project["Title"],
          subheader: `Closing on ${project["Deadline"]}`,
          image: project["Img"],
          description: project["Description"],
          collected: project["CapitalRaised"],
          target: project["Target"],
          content: project["Description"],
          creator_id: project["Creator"],
        });
      });

      setPosts(postarray);
    } catch (e) {
      console.log(e);
    }
  }

  function getPosts() {
    setPosts(posts_data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (!posts) return <h1>Loading...</h1>;

  return (
    <div className="postlist-container">
      <PostList posts={posts} />
    </div>
  );
};

export default Posts;

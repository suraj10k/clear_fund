import * as React from "react";
import { useState , useEffect } from "react";
import {create } from 'ipfs-http-client';
import {ethers,utils} from "ethers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Button, Typography } from "@mui/material";
import ClearFund from "../../artifacts/contracts/clearFund.sol/clearFund.json"
import "./Newpost.css";

const ClearFundAddress = "0x3BB898B4Bbe24f68A4e9bE46cFE72D1787FD74F4";
const client = create('https://ipfs.infura.io:5001/api/v0');

export default function NewPost() {

  let [allProjects,setAllProjects] = useState([]);
  let [account,setAccount] = useState("");
  
  useEffect(() => {
    getProjectsFunc()
  },[]);
  
  async function getProjectsFunc() {
    account = await window.ethereum.request({ method: 'eth_requestAccounts' })
		setAccount(account);
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);

		try {
			let getAllProjectsArray = await contract.getAllProjects();
			console.log(getAllProjectsArray);
			console.log(getAllProjectsArray[0].Title);
			console.log(getAllProjectsArray[0][4]);
			setAllProjects(getAllProjectsArray);
		}
		catch (e) {
			console.log(e);
		}
	}

  /*let uploadImageOnIPFS = async () =>{
    const file = fileInput.files[0];
    const added = await client.add(file);
    const url =  `https://ipfs.infura.io/ipfs/${added.path}`
    return url;
  }*/

  async function startProject() {
    
    getProjectsFunc();
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ClearFundAddress,ClearFund.abi,signer);
    
    try{
      let Title = document.getElementById("Title").value;
      let Description = document.getElementById("Description").value;
      let AmountInEth = document.getElementById("FundAmount").value;
      let Amount = ethers.utils.parseEther(AmountInEth);
      let Time = document.getElementById("Time").value;
      let Location = document.getElementById("Location").value;
      let Category = "DeFi";
      let img = "https://docs.metamask.io/metamask-fox.svg";
      /*let img = await uploadImageOnIPFS(); */
      //console.log(img);
      let txn = await contract.startProject(Title,Description,Time,Amount,Location,Category,img);
      let txnreceipt = await txn;
      console.log(txnreceipt);
      getProjectsFunc();
    } catch (e){
      alert(e.message)
    }
  }

/*  const [formData, setFormData] = React.useState({
    Title: "",
    Description: "",
    FundAmount: "",
    Time: "",
    Location: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  }
 */
  return (
    <div className="container">
      <Typography variant="h4" mb={5}>
        Add new project
      </Typography>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "75ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto auto",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="Title"
            type="text"
            label="Project title"
          />
          <TextField
            required
            id="Description"
            type="text"
            label="Project description"
          />
          <TextField
            required
            id="FundAmount"
            type="number"
            label="Fund Amount"
          />
          <TextField
            required
            id="Time"
            type="number"
            label="Raise Until"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="Location"
            type="text"
            label="Location"
          />
        </div>
      </Box>
      <Button onClick={() => startProject()} variant="contained">submit</Button>
    </div>
  );
}

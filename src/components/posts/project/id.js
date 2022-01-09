import React,{useContext,useState} from "react";
import {BigNumber,ethers,utils} from 'ethers';
import ClearFund from '../../../artifacts/contracts/clearFund.sol/clearFund.json';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import {
    Block, BlockTag, BlockWithTransactions, EventType, Filter, FilterByBlockHash, ForkEvent,
    Listener, Log, Provider, TransactionReceipt, TransactionRequest, TransactionResponse
} from "@ethersproject/abstract-provider";
import { Deferrable, defineReadOnly, getStatic, resolveProperties } from "@ethersproject/properties";
import { useEffect } from 'react'

const ClearFundAddress = "0x3BB898B4Bbe24f68A4e9bE46cFE72D1787FD74F4";

export default function Project() {
	
    const [account, setAccount] = useState("");
	const [ html , setHtml] = useState("");
    const [ reqButtonShow, setReqButtonShow ] = useState(false);
	const [project, setProject] = useState([]);

	const [requests, setRequests] = useState([]);
	const [amountToFund, setAmount] = useState()
	const [myFunds, setMyFunds] = useState(0);

	const [deadline, setDeadline ] = useState({});
    //state for withdraw
    const [amountToWithdraw, setAmountToWithdraw] = useState(0);
	const [description, setDescription ] = useState("");
	const [receiptent, setReceiptent] = useState("");
	
	const [isReadMore, setIsReadMore] = useState(false);
	const [projectDescription, setProjectDescription] = useState("")

    useEffect(() => {getProject(id)}, [id])
	useEffect(() => {unixToDate()}, [project])

    async function getProject(id) {
		console.log(id)
		let account = await window.ethereum.request({ method: 'eth_requestAccounts' });
		setAccount(account[0]);

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, provider);

		try {
			console.log(id)
			let getProject = await contract.getDetails(Number(id));
			setProject(getProject)
			console.log(getProject);

			await myContribution(id)
			if (getProject.creator.toLowerCase() == account[0].toLowerCase() ) {
				setReqButtonShow(true);
				// console.log(reqButtonShow);
			}
		}
		catch (e) {
			console.log(e);
		}
		await getAllRequest();
	}
    async function fundProject() {
		console.log(amountToFund);
		getProject(id)
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);


        let Account = await window.ethereum.request({ method: 'eth_requestAccounts' });


		const blocktag = await provider._getBlockTag();
		// console.log(blocktag);

		const result = await provider.getBalance(Account[0], blocktag);

		// console.log(Number(result));
		let balance = ethers.utils.formatEther(result);
		// console.log(balance);


		if(amountToFund == "" || amountToFund <= 0) {
			alert("funding amount can't be 0 or less");
		}
		else if (balance <= amountToFund ) {
			alert("amount to contribute is more than you balance");
		}
		else if (Account[0].toLowerCase() == project.creator.toLowerCase()) {
			alert("project creator can't contribute")

		}
		else {
			try {
				let amountToContribute  = utils.parseEther(amountToFund);
				const options = {value: amountToContribute }
				let fundProjectTxn = await contract.contribute(Number(id), options);
			
				let fundTxn = await fundProjectTxn.wait();
				console.log(fundProjectTxn);
				console.log(fundTxn.logs[1].address);
				let html = `${fundTxn.logs[1].address}`
							setHtml(html);

				getProject(id)
			} catch (e) {
				console.log(`e`, e)
				alert(e.message, "project is expired or succesfull, consider updating the state (from button below fund project) so that it can appear on the project that the project is expired for everyone" )
			}
		}
	}
    async function getRefund() {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);
		try {
		let refundtxn  = await contract.getRefund(Number(id));
		await refundtxn.wait();

		// alert("refund status",refundtxn)
		getProject(id)

		}
		catch (e) {
			alert(e.message);
		}

	}
	async function unixToDate() {
		let unixTime = Number(project.deadline)*1000 // unix time in milliseconds
		const dateObject = new Date(unixTime);
		const humanDateFormat = dateObject.toLocaleString() // 2021-12-9 10:34:30
		let dateDeadline = {
			 day: `${dateObject.toLocaleString("en-Us", {day: "numeric"})}`,
			 month: `${dateObject.toLocaleString("en-Us", {month: "long"})}`,
			 year: `${dateObject.toLocaleString("en-Us", {year: "numeric"})}`,
			 hour: `${dateObject.toLocaleString("en-Us", {hour: "numeric"})}`,
			 minute: `${dateObject.toLocaleString("en-Us", {minute: "numeric"})}`,
			 second: `${dateObject.toLocaleString("en-Us", {second: "numeric"})}`,
			 timeZone: `${dateObject.toLocaleString("en-Us", {timeZoneName: "short"})}`
		}
		setDeadline(dateDeadline);
	}

	async function updateStatus() {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);

		let check = await contract.checkIfFundingCompleteOrExpired(Number(id));
		await check.wait();
		getProject(id)
	}


	async function vote(e) {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);
		try {
			console.log(e.currentTarget.id);

			let votetxn  = await contract.voteRequest(Number(id), e.currentTarget.id);
			await votetxn.wait();
			getProject(id)
		}
		catch (e) {
			alert(e);
		}
	}

	async function myContribution() {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, provider);
		console.log(id);
		let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		console.log("account is ", accounts[0]);


		let myFunding = await contract.myContributions(Number(id), accounts[0]);

		console.log(myFunding);
		setMyFunds((Number(myFunding)/1000000000000000000).toFixed(6));
	}

	async function getAllRequest() {
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, provider);


		try {
			let allRequests = await contract.getAllRequests(Number(id));
			setRequests(allRequests);
			console.log(allRequests);



		} catch (e) {
			console.log(e)
		}

	}

	async function createRequest() {
		if(account.toLowerCase() != project.creator.toLowerCase() ) {
			alert("You are not the creator of this project/campaign so you can't create request");
		}

		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();
		let contract = new ethers.Contract(ClearFundAddress, ClearFund.abi, signer);


		try {
			let amount = ethers.utils.parseEther(amountToWithdraw);
			console.log(amount, description, receiptent);
			let createRequestTxn = await contract.createRequest(Number(id), description, amount, receiptent);
			await createRequestTxn.wait();
			console.log("request created");
			getAllRequest();
		} catch (e) {
			alert(e.message)
		}
	}

  async function createRequestButtonHandler() {
	let Account = await window.ethereum.request({ method: 'eth_requestAccounts' });
	if (Account[0].toLowerCase() !== project.creator.toLowerCase()) {
		alert("only project creator can create requests for withdrawal")

	}

	else {
		setIsOpen(true)

	}
  }
}
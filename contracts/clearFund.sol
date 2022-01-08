//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6; 

import "hardhat/console.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract clearFund {
using SafeMath for uint256;
address payable owner;
    enum State {
        Funding, 
        Expired, 
        Funded 
    }

uint private treasury;

constructor() {
owner = payable(msg.sender);
}
struct Project {
    uint  OrgainizationId; 
    address payable Creator;
    string  Title; 
    string  Description; 
    uint  Target; 
    uint  CapitalRaised;  
    uint  Deadline; 
    string  Location; 
    string  Category;  
    string Img; 
    State  state; 
    uint noOfContributors; 
    Request[] requests; 
    uint  numRequests; 
    
   }

struct Request {
        uint requestId; 
        string desc; 
        uint value;  
        address payable receipient; 
        bool status; 
        uint noOfVoter; 
        
    }


 struct Voters {
       uint requestId;
       mapping (address=>bool) vote; 
    
    }

  struct Contributions {
      uint  projectId;
      mapping (address => uint)  contributions;
      Voters[] voters;
 
    }
   Contributions[] arrayContributors;
   

   uint counterProjectID;


   Project[] projects;

  

    event FundingReceived(address contributor, uint amount, uint currentTotal);
    event CreatorPaid(address recipient);

function startProject(
        string memory _projectTitle,
        string memory _projectDesc,
        uint _fundRaisingDeadline,
        uint _goalAmount,
        string memory _location,
        string memory _category, string memory _img) public {

        projects.push(); 
				arrayContributors.push(); 
        uint index = projects.length - 1;
       

        projects[index].OrgainizationId = counterProjectID; 
        
        projects[index].Creator = payable(address(msg.sender));
        projects[index].Title = _projectTitle;
        projects[index].Description = _projectDesc;
        projects[index].Target = _goalAmount;
        projects[index].Deadline = block.timestamp.add(_fundRaisingDeadline.mul(60)); 
        projects[index].CapitalRaised = 0;
        projects[index].Location = _location;
        projects[index].Category = _category;
        projects[index].Img = _img;
        projects[index].state = State.Funding;
          
		arrayContributors[index].projectId = counterProjectID; 
    
        counterProjectID++;
    }

    function checkIfFundingCompleteOrExpired(uint _projectId) public {
        if (projects[_projectId].CapitalRaised >= projects[_projectId].Target) {
            projects[_projectId].state = State.Funded;        
        } else if (block.timestamp > projects[_projectId].Deadline)  {
            projects[_projectId].state = State.Expired;
        }
        else {
             projects[_projectId].state = State.Funding;
        }
       
    }

    function contribute(uint _projectId) external payable returns(bool){
         require(msg.sender != projects[_projectId].Creator, "Project creator can't contribute");
          checkIfFundingCompleteOrExpired(_projectId); 
          require( projects[_projectId].state == State.Funding, "expired or succesful"); 
           projects[_projectId].CapitalRaised = projects[_projectId].CapitalRaised.add(msg.value);
           arrayContributors[_projectId].contributions[msg.sender] = arrayContributors[_projectId].contributions[msg.sender].add(msg.value);
           emit FundingReceived(msg.sender, msg.value, projects[_projectId].CapitalRaised);
         if (arrayContributors[_projectId].contributions[msg.sender] == 0) {
         projects[_projectId].noOfContributors++;
         }
        return true;
    }


    function getRefund(uint _projectId) public returns (bool) {
        
        checkIfFundingCompleteOrExpired(_projectId);
        require( projects[_projectId].state == State.Expired , "project not expired, can't refund");
        require(arrayContributors[_projectId].contributions[msg.sender] > 0, "you have not contributed to this project");
        uint amountToRefund = arrayContributors[_projectId].contributions[msg.sender];
        arrayContributors[_projectId].contributions[msg.sender] = 0;
        address payable sender = payable(msg.sender);
        if (!sender.send(amountToRefund)) {
           arrayContributors[_projectId].contributions[msg.sender] = amountToRefund;
            return false;
        } else {
            projects[_projectId].CapitalRaised = projects[_projectId].CapitalRaised.sub(amountToRefund);
        }
         return true;
    }

function getDetails(uint _projectId) public view returns (Project memory) {
    return projects[_projectId];  
    }

    function createRequest( uint _projectId, string memory _desc, uint _value, address payable _receipient) public  {
        require( projects[_projectId].state == State.Funded, "project expired or successful can't create request");
        require(msg.sender == projects[_projectId].Creator, "only manager can create Request");
        require(_value <= projects[_projectId].CapitalRaised, "withdrawal is more than balance");

        projects[_projectId].requests.push();
        arrayContributors[_projectId].voters.push();
        uint num = projects[_projectId].requests.length - 1;

         projects[_projectId].requests[num].desc = _desc;
         projects[_projectId].requests[num].value = _value;
         projects[_projectId].requests[num].receipient = _receipient;
         projects[_projectId].requests[num].requestId = num;
        projects[_projectId].numRequests++;
        

    }

    function sendPayout (uint _projectId, address payable _address, uint _value, uint _requestNo) private  returns(bool) {
         Request storage thisRequest = projects[_projectId].requests[_requestNo]; 
         require(thisRequest.noOfVoter >= projects[_projectId].noOfContributors.div(2), "condition not fullfilled yet");
        uint amountToTransfer = _value*97/100;
        uint fee = _value*3/100;
        treasury += fee; 
         if (_address.send(amountToTransfer) ) {
            emit CreatorPaid(_address);
            owner.transfer(fee); 
            projects[_projectId].CapitalRaised = projects[_projectId].CapitalRaised.sub(_value);

            return (true);
        } else {
             return (false);
        }
    }



    function voteRequest(uint _projectId, uint _requestNo) public {
   
        require( projects[_projectId].state == State.Funded, "project expired or successful can't create request");
        require(arrayContributors[_projectId].contributions[msg.sender] > 0, "you must be a contributor to vote");
        require ( arrayContributors[_projectId].voters[_requestNo].vote[msg.sender] == false, "you have already voted");
        projects[_projectId].requests[_requestNo].noOfVoter++;
        arrayContributors[_projectId].voters[_requestNo].vote[msg.sender] = true;

        if(projects[_projectId].requests[_requestNo].noOfVoter*2 >= projects[_projectId].noOfContributors && projects[_projectId].requests[_requestNo].value <= projects[_projectId].CapitalRaised) {
        projects[_projectId].requests[_requestNo].status = true;
        sendPayout(_projectId, projects[_projectId].requests[_requestNo].receipient, projects[_projectId].requests[_requestNo].value, _requestNo);    
        }
        
    }


   function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getAllProjects() public view returns (Project[] memory) {
     return projects;
           
    }

    function myContributions(uint _projectId, address _address) public view returns (uint) {
      return arrayContributors[_projectId].contributions[_address];
    }
     
    function getAllRequests(uint _projectID) public view returns (Request[] memory) {
    return projects[_projectID].requests;
    }  
}
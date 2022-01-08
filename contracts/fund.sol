//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
'
contract pay{
    address payable owner;

    enum State{Funding,Expired,Funded}

    constructor(){
        owner = payable(msg.sender);
    }

    struct Project{
        uint IpfsHash;
        address payable Creator;
        uint ProjectID;
        string Title;
        string Description;
        uint TargetGoal;
        uint Raised;
        uint Deadline;
        uint Contributors;
        uint CurrentBalance;
        State state;
    }
    struct Contributions {
      uint  projectId;
      mapping (address => uint)  stake;
      //Voters[] voters;
 
    }
    Contributions[] arrayContributors;

    uint counterPorjectID;

    Project[] projects;

    function startProject(string memory _Title,string memory _Description,uint _TargetGoal,uint _Deadline) public{
        projects.push();
        uint index = projects.length - 1;
        projects[index].ProjectID = counterProjectID;
        projects[index].Creator = payable(address(msg.sender));
        projects[index].Title = _Title;
        projects[index].Description = _Description;
        projects[index].TargetGoal = _TargetGoal;
        projects[index].Deadline = block.timestamp.add(_Deadline.mul(60));
        projects[index].CurrentBalance = 0;
        projects[index].state = State.Funding;

        arrayContributors[index].ProjectID = counterProjectID;
        counterProjectID++;
    }

    function fundStatus(uint _projectId) public {
         if (projects[_projectId].CurrentBalance >= projects[_projectId].TargetGoal) {
            projects[_projectId].state = State.Funded;
        } else if (block.timestamp > projects[_projectId].Deadline)  {
            projects[_projectId].state = State.Expired;
        }
        else {
             projects[_projectId].state = State.Funding;
        }
        
    }

}
    function contribute(uint _projectId) external payable returns(bool){
        reqiure(msg.sender!=projects[_projectId].Creator , "Projets can't be funded by the creator of the Project Fund ");
        fundStatus(_projectId);
        require(projects[_projectId].state == State.Funding, "Expired or Funded");
        projects[_projectId].CurrentBalance = projects[_projectId].CurrentBalance.add(msg.value);//(add function from the library)
        arrayContributors[_projectId].stake[msg.sender] = arrayContributors[_projectId].stake[msg.sender].add(msg.value);
        emit FundingReceived(msg.sender, msg.value, projects[_projectId].currentBalance);
         if (arrayContributors[_projectId].stake[msg.sender] == 0) {
         projects[_projectId].Contributors++;
         }
         fundStatus(_projectId);
         return true;
    } 

    function getRefund(uint _projectId) public returns (bool) 
    { 
        fundStatus(_projectId);
        require( projects[_projectId].state == State.Expired , "Project not expired, can't refund");
        require(arrayContributors[_projectId].stake[msg.sender] > 0, "you have not contributed to this project");

        uint amountToRefund = arrayContributors[_projectId].stake[msg.sender];
        arrayContributors[_projectId].stake[msg.sender] = 0 ;
        address payable sender = payable(msg.sender);
        if (!sender.send(amountToRefund)) 
        {
           arrayContributors[_projectId].stake[msg.sender] = amountToRefund;
            return false ;
        } 
        else 
        {
            projects[_projectId].currentBalance = projects[_projectId].currentBalance.sub(amountToRefund);
        }
         return true;
    }

    function createRequest(uint _ProjectID,string memory _Description,uint _value,address payable _recepient) public {
        
        require( projects[_projectId].state == State.Funded, "project expired or successful can't create request");
        require(msg.sender == projects[_projectId].creator, "only manager can create Request");
        require(_value <= projects[_projectId].currentBalance, "withdrawal is more than balance");

        projects[_projectId].requests.push();
        arrayContributors[_projectId].voters.push();
        uint num = projects[_projectId].requests.length - 1;


         projects[_projectId].requests[num].desc = _desc;
         projects[_projectId].requests[num].value = _value;
         projects[_projectId].requests[num].receipient = _receipient;
         projects[_projectId].requests[num].requestId = num;
        projects[_projectId].numRequests++;
    }

    
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getAllProjects() public view returns (Project[] memory) {
     return projects;
           
    }

    function myContributions(uint _projectId, address _address) public view returns (uint) {
      return arrayContributors[_projectId].stake[_address];
    } 
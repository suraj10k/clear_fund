//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "hardhat/console.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract pay{
    address payable owner;

    enum State{Funding,Expired,Funded};

    constructor(){
        owner = payable(msg.sender);
    }

    strcut Project{
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
    }    Project[] projects;

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

}
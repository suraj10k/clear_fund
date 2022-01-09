require("@nomiclabs/hardhat-waffle");

const fs = require('fs');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.6",
  paths: {
    artifacts: './src/artifacts',
  },
  networks:{
    ropsten:{
        url: "https://ropsten.infura.io/v3/0f641ab893d749ef8cc8dc5b6b6ca78d",
        accounts: ["716f7126775af885e7f5d5e5f66b0a1c252b9bb7f878c47c0fe3a2a8c9eb3c93"]
    }
  }
};



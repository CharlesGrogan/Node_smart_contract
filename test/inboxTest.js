const assert = require("chai").assert;
const ganache = require("ganache-cli");
const Web3 = require("web3"); // This imports the Constructor Web3
const web3 = new Web3(ganache.provider()); // This creates the instance of web3 - attempt to local test network

beforeEach(() => {
  // Get a list of all accounts - solely for dev purposes - retrieves 10 test accounts
  web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts);
  });

  // Use one of those accounts to deploy
  // the contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {});
});

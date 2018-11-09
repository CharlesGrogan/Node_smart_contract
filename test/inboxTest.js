const assert = require("chai").assert;
const ganache = require("ganache-cli");
const Web3 = require("web3"); // This imports the Constructor Web3
const web3 = new Web3(ganache.provider()); // This creates the instance of web3 - attempt to local test network
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts - solely for dev purposes - retrieves 10 test accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});

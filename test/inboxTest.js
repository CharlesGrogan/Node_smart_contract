const assert = require("chai").assert;
const ganache = require("ganache-cli");
const Web3 = require("web3"); // This imports the Constructor Web3
const web3 = new Web3(ganache.provider()); // This creates the instance of web3 - attempt to local test network
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const init_str = "Blockchain rules!";
const second_str = "I am the second string";

beforeEach(async () => {
  // Get a list of all accounts - solely for dev purposes - retrieves 10 test accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // teaches web3 about what methods an inbox contract has
    .deploy({ data: bytecode, arguments: [init_str] }) // tells web3 that we want to deploy a new copy of this contract
    .send({ from: accounts[0], gas: "1000000" }); // instructs web3 to send out a transaction that creates this contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call(); // inbox == to copy of contract on blockchain; methods = object that contains all public fn on contract; message == to the fn being called in the () put any fn arguements; call() is used to customize the transaction your attempting to send out
    assert.equal(message, init_str);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage(second_str).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, second_str);
  });
});

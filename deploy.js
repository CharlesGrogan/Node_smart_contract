const HDwalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDwalletProvider(
  "memory own burden citizen foil energy hint spin noble inspire eternal race",
  "https://rinkeby.infura.io/v3/5b4022ab086246b5bd2f634e27e24783"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account:", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed to: " + result.options.address);
};

deploy();

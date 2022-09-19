const hre = require("hardhat");

function tokens(n) {
  return ethers.utils.parseEther(n);
}

async function main() {
  const owner = process.env.OWNER;
  const whitelister = process.env.WHITELISTER;

  const Mechadium = await hre.ethers.getContractFactory("Mechadium");
  const MechadiumContract = await Mechadium.deploy();

  await MechadiumContract.deployed();

  await MechadiumContract.transfer(owner, tokens('10000000000'));
  await MechadiumContract.transferOwnership(owner);
  await MechadiumContract.transferWhitelister(whitelister);
  
  console.log("Mechadium deployed to:", MechadiumContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

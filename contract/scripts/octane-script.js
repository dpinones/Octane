const hre = require("hardhat");

async function main() {
  const Octane = await hre.ethers.getContractFactory("Octane");
  const octane = await Octane.deploy();
  await octane.deployed();
  console.log("Octane deployed to:", octane.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

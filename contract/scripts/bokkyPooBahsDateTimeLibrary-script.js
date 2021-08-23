const hre = require("hardhat");

async function main() {
  const BokkyPooBahsDateTimeLibrary = await hre.ethers.getContractFactory("BokkyPooBahsDateTimeLibrary");
  const bokkyPooBahsDateTimeLibrary = await BokkyPooBahsDateTimeLibrary.deploy("Hello, Hardhat!");
  await bokkyPooBahsDateTimeLibrary.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

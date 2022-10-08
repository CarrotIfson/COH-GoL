import { ethers, hardhatArguments } from "hardhat";
import  * as Config from "./config";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer] = await ethers.getSigners();
  console.log('deployer address: ', deployer.address);
 

  const CGoL = await ethers.getContractFactory("GCOL");
  const cGoL = await CGoL.deploy();
  console.log("Deployed cGoL on: ", cGoL.address);
  Config.setConfig(network + '.cGoL', cGoL.address);
  await Config.updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

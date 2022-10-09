import { ethers, hardhatArguments } from "hardhat";
import { HUNDRED_SEED } from "../utils/patterns";
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

  await cGoL.set_game(10, HUNDRED_SEED, Math.sqrt(HUNDRED_SEED.length));
  console.log("waiting...");
  await delay(10000);
  console.log("waited...");
  await cGoL.runGameBasic();

}

const delay = ms => new Promise(res => setTimeout(res, ms));
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

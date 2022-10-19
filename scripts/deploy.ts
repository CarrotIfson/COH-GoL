import { ethers, hardhatArguments } from "hardhat";
import { bFIFTEEN_SQUARE_2P, bTWENTY_SQUARE_2P, FIFTEEN_SQUARE_2P, HUNDRED_BEND_2P, HUNDRED_SEED, PUFFER_BSEED_2P, THIRTY_SQUARE_2P, TWENTYTEN_RECT_2P, TWENTY_SQUARE_2P } from "../utils/patterns";
import  * as Config from "./config";
import { ABI } from "../utils/abi";
import { b2SEED_100P1, b2SEED_100P2 } from "../utils/split_patterns";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
  const [deployer, susan] = await ethers.getSigners();

  console.log('deployer address: ', deployer.address);
  console.log('player2 address: ', susan.address);
 
  /*
  const CGoL = await ethers.getContractFactory("GCOL2P");
  const cGoL = await CGoL.deploy();
  console.log("Deployed cGoL on: ", cGoL.address);
  Config.setConfig(network + '.cGoL', cGoL.address);
  await Config.updateConfig();
  let res = await cGoL.getGameCount();
  */
 /*
  const config = Config.getConfig();
  
  const cGoL = await ethers.getContractAt(ABI, config.cantomain.cGoL);
  console.log("Instantiated contract");
  await cGoL.setGameArray2P(20, 20, TWENTY_SQUARE_2P, 1, 10); 
  console.log("Instantiated contract");
  await delay(10000);  
  await cGoL.connect(susan).joinGame(0); 
  console.log("Joined game");
  await delay(10000);  
  await cGoL.executeGame(0); 
   */ 
 /*
  const config = Config.getConfig()
  const BCGoL = await ethers.getContractFactory("BGCOL");
  const bcGoL = await BCGoL.deploy();
  await bcGoL.setGameArray2P(15, 15, bTWENTY_SQUARE_2P, 1, 10); 
  console.log("Instantiated contract");
  await delay(10000);  
  await bcGoL.connect(susan).joinGame(0); 
  console.log("Joined game");
  await delay(10000);  
  await bcGoL.executeGame(0); 
  Config.setConfig(network + '.bcGoL', bcGoL.address);


 */
  /*
  const CGoL = await ethers.getContractFactory("GCOL2P");
  const cGoL = await CGoL.deploy();
  await cGoL.setGameArray2P(15, 15, FIFTEEN_SQUARE_2P, 1, 10); 
  await cGoL.setGameArray2P(20, 20, TWENTY_SQUARE_2P, 1, 15); 
  console.log("Instantiated contract");
  await delay(10000);  
  await cGoL.connect(susan).joinGame(0); 
  await cGoL.connect(susan).joinGame(1); 
  console.log("Joined game");
  await delay(10000);  
  await cGoL.executeGame(0);  
  await cGoL.executeGame(1);  
  Config.setConfig(network + '.cGoL', cGoL.address);
  */


  const BCGoL = await ethers.getContractFactory("BGCOLBetting");
  const bcGoL = await BCGoL.deploy();
  await bcGoL.setGameArray2P(10, 10, b2SEED_100P1, 1, 30, 0);  
  await delay(10000);   
  await bcGoL.connect(susan).joinGame(0,b2SEED_100P2); 
  await delay(10000);  
  
  await bcGoL.executeGame(0);   
  Config.setConfig(network + '.bcGoL', bcGoL.address);
  
  await Config.updateConfig();


  /*
    await cGoL.connect(susan).joinGame(0); 
  */
  /*
  await cGoL.executeGame(8);   
  await cGoL.getGameGrid(8);  
  */
  /*
  await cGoL.set_game(10, HUNDRED_SEED, Math.sqrt(HUNDRED_SEED.length));
  console.log("waiting...");
  await delay(10000);
  console.log("waited...");
  await cGoL.runGameBasic();
  */
  /*
  await cGoL.setGameArray2P(19, 13, PUFFER_WSEED_2P, 10, 9); 
  await cGoL.connect(susan).joinGame(8); 
  await moveBlocks(15);  
  await cGoL.executeGame(8);   
  res = await cGoL.getGameGrid(8);  
  */

}
const delay = ms => new Promise(res => setTimeout(res, ms));
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/* import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as chai from "chai";
import { keccak256 } from "ethers/lib/utils";
import { IERC20 } from "../typechain";
import BigNumber from 'bignumber.js';
import { Signer } from "ethers";

*/
import { expect } from "chai";
import { ethers, network, waffle } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as chai from "chai";
import { keccak256, stripZeros } from "ethers/lib/utils";
//import { IERC20 } from "../typechain";
import BigNumber from 'bignumber.js';
import { Signer, BigNumberish } from "ethers";
import { SOME_SEED, CUBE_SEED, O, l, BLINKER_SEED, BEACON_SEED, GLIDER_SEED, GLIDER_END, HUNDRED_SEED, HUNDRED_END, SOME_SEED_2P, CUBE_SEED_2P, BLINKER_SEED_2P, BLINKER_ODD_2P, HUNDRED_SEED_2P, HUNDRED_END_2P, HUNDRED_WEND_2P, HUNDRED_BSEED_2P, HUNDRED_WSEED_2P, HUNDRED_BEND_2P, PUFFER_WSEED_2P, PUFFER_BSEED_2P, COLLISION_SEED_2P, COLLISION_WWIN_2P, COLLISION_WEND_2P, COLLISION_BEND_2P, bSOME_SEED_2P, bCUBE_SEED_2P, bCUBE_SEED_2Pv, bBLINKER_SEED_2P, bBLINKER_ODD_2P, wbBLINKER_SEED_2P, bHUNDRED_WSEED_2P, bHUNDRED_WEND_2P, bHUNDRED_BSEED_2P, bHUNDRED_BEND_2P, bCOLLISION_SEED_2P, bCOLLISION_WWIN_2P, bCOLLISION_WEND_2P, bCOLLISION_BEND_2P, bTHIRSTY_SQUARE_2P, bTWENTY_SQUARE_2P, TWENTY_SQUARE_2P, FIFTEEN_SQUARE_2P } from "../utils/patterns";

import { moveBlocks } from "../utils/move_blocks";

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const provider = waffle.provider;

function parse18Dec(amount: Number) {
    return ethers.utils.parseUnits(amount.toString(), 18);
}
function parseWei(amount: BigNumberish) {
    return parseFloat(ethers.utils.formatEther(amount));
}
function arraysEqual(a: Array, b: Array) {
    if (a === b) return true;
    if (a == null || b == null) return false; 
    if (a.length !== b.length) return false; 

    for (var i = 0; i < a.length; ++i) { 
      if (a[i] !== b[i]) return false;
    }

    return true;
  }
 
function logRectMatrix(rows:number, cols: number, m: Array) {
    console.log("-------------------");
    for (let i = 0; i < rows; i++) {
        console.log(m.slice(i * cols, i * cols + cols).toString());
    }
    console.log("-------------------");
}


describe("Array2P", function () {
    let owner: SignerWithAddress,
        susan: SignerWithAddress,
        bob: SignerWithAddress,
        carl: SignerWithAddress;

    let cGoL: Contract;
    const duration = 10; //blocks
    /*
    this.beforeEach(async () => { 
    })
    */
    
    it("Should deploy and set the game 2P", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const CGoL = await ethers.getContractFactory("GCOL2P", owner);
        cGoL = await CGoL.deploy();
        console.log(`\tDeployed CGoL contract at ${cGoL.address}`);
         

        //await cGoL.setGameArray2P(5,8,bCUBE_SEED_2P,1,10); 
        await expect(cGoL.setGameArray2P(2, 4, SOME_SEED_2P, duration, 10)).revertedWith("_rows and _cols dont match _seed");
        
        await cGoL.setGameArray2P(5, 8, CUBE_SEED_2P, 10, 2);
        await cGoL.setGameArray2P(5, 8, CUBE_SEED_2P, 10, 2);
        await cGoL.setGameArray2P(5, 8, CUBE_SEED_2P, 10, 2);
   
    }) 
    
    it("Should test gas ", async function () {
       
        await cGoL.setGameArray2P(5, 8, CUBE_SEED_2P, 10, 2);  
        await cGoL.connect(susan).joinGame(3);
        await moveBlocks(10);  
        await cGoL.executeGame(3);     
        let res = await cGoL.getGameGrid(3);    
        expect(arraysEqual(res, CUBE_SEED_2P)).to.equal(true);
 

        await cGoL.setGameArray2P(4, 8, BLINKER_SEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(4);
        await moveBlocks(10);  
        await cGoL.executeGame(4);     
        res = await cGoL.getGameGrid(4);   
        expect(arraysEqual(res, BLINKER_SEED_2P)).to.equal(true);
 

        await cGoL.setGameArray2P(4, 8, BLINKER_SEED_2P, 10, 1);  
        await cGoL.connect(susan).joinGame(5);
        await moveBlocks(10);  
        await cGoL.executeGame(5);   
        res = await cGoL.getGameGrid(5);       
        expect(arraysEqual(res, BLINKER_ODD_2P)).to.equal(true);
 

        await cGoL.setGameArray2P(10, 10, HUNDRED_WSEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(6);
        await moveBlocks(10);  
        await cGoL.executeGame(6);     
        res = await cGoL.getGameGrid(6);  
        expect(arraysEqual(res, HUNDRED_WEND_2P)).to.equal(true); 
 

        await cGoL.setGameArray2P(10, 10, HUNDRED_BSEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(7);
        await moveBlocks(10);  
        await cGoL.executeGame(7);     
        res = await cGoL.getGameGrid(7);  
        expect(arraysEqual(res, HUNDRED_BEND_2P)).to.equal(true); 
        
        
        await cGoL.setGameArray2P(3, 5, COLLISION_SEED_2P, 1, 1); 

        await cGoL.setGameArray2P(3, 5, COLLISION_SEED_2P, 1, 1); 
        await cGoL.connect(susan).joinGame(9); 
        await moveBlocks(15);  
        await cGoL.setRandomizer(9); 
        await cGoL.executeGame(9);   
        res = await cGoL.getGameGrid(9);   
        expect(arraysEqual(res, COLLISION_WWIN_2P)).to.equal(true);  

        await cGoL.setGameArray2P(3, 5, COLLISION_SEED_2P, 1, 10); 
        await cGoL.connect(susan).joinGame(10); 
        await moveBlocks(15);  
        await cGoL.setRandomizer(10); 
        await cGoL.executeGame(10);   
        res = await cGoL.getGameGrid(10);  
        expect(arraysEqual(res, COLLISION_WEND_2P)).to.equal(true);   
 
        await cGoL.setGameArray2P(3, 5, COLLISION_SEED_2P, 1, 6); 
        await cGoL.connect(susan).joinGame(11); 
        await moveBlocks(15);  
        await cGoL.setRandomizerBWin(11); 
        await cGoL.executeGame(11);   
        res = await cGoL.getGameGrid(11);  
        expect(arraysEqual(res, COLLISION_BEND_2P)).to.equal(true);   

        await cGoL.setGameArray2P(15, 15, FIFTEEN_SQUARE_2P, 1, 20); 
        await cGoL.connect(susan).joinGame(12); 
        await moveBlocks(15);  
        await cGoL.setRandomizerBWin(12);
        await cGoL.executeGame(12);  
            
        /*
        await cGoL.setGameArray2P(20, 20, TWENTY_SQUARE_2P, 1, 10); 
        await cGoL.connect(susan).joinGame(13); 
        await moveBlocks(15);  
        await cGoL.setRandomizerBWin(13); 
        await cGoL.executeGame(13); 
            */
    })
    
})
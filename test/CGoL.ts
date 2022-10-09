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
import { SOME_SEED, CUBE_SEED, O, l, BLINKER_SEED, BEACON_SEED, GLIDER_SEED, GLIDER_END, HUNDRED_SEED, HUNDRED_END }  from "../utils/patterns";

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

function logSquareMatrix(m: Array) {
    const r = Math.sqrt(m.length); 
    console.log("-------------------");
    for (let i = 0; i < r; i++) {
        console.log(m.slice(i*r,i*r+r).toString());
    }
    console.log("-------------------"); 
}
 

describe("CantosGoL", function () {
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
    it("Should deploy and set the game", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const CGoL = await ethers.getContractFactory("GCOL", owner);


        let block = await ethers.provider.getBlockNumber(); 
        cGoL = await CGoL.deploy();
        console.log(`\tDeployed CGoL contract at ${cGoL.address}`);

 
        await expect(cGoL.set_game(duration, SOME_SEED, 3)).revertedWith("grid should be a square");  
        await cGoL.set_game(duration, SOME_SEED, 2);  
  
        const currentBlock = await ethers.provider.getBlockNumber()+duration;  

        const game_grid = await cGoL.getGameGrid();
        expect(Number(await cGoL.getEndBlock())).to.equal(currentBlock);  
        //expect(arraysEqual(game_grid, SOME_SEED)).to.equal(true);
        expect(await cGoL.getGridLength()).to.equal(Math.sqrt(SOME_SEED.length));

    })

    it("Should play the game", async function () {
        await cGoL.set_game(duration, CUBE_SEED, Math.sqrt(CUBE_SEED.length));  
        let res = await cGoL.callStatic.runGameBasic(); 

        expect(arraysEqual(res, CUBE_SEED)).to.equal(true);
        await cGoL.set_game(3, BLINKER_SEED, Math.sqrt(BLINKER_SEED.length));
        res = await cGoL.callStatic.runGameBasic();  

        expect(arraysEqual(res, BLINKER_SEED)).to.equal(false);
        await cGoL.set_game(8, BLINKER_SEED, Math.sqrt(BLINKER_SEED.length));
        res = await cGoL.callStatic.runGameBasic();  
        expect(arraysEqual(res, BLINKER_SEED)).to.equal(true);  

        await cGoL.set_game(1, BEACON_SEED, Math.sqrt(BEACON_SEED.length));
        res = await cGoL.callStatic.runGameBasic();   
        expect(arraysEqual(res, BEACON_SEED)).to.equal(false);
        await cGoL.set_game(6, BEACON_SEED, Math.sqrt(BEACON_SEED.length));
        res = await cGoL.callStatic.runGameBasic();  
        expect(arraysEqual(res, BEACON_SEED)).to.equal(true); 
        await cGoL.set_game(1, GLIDER_SEED, Math.sqrt(GLIDER_SEED.length));
        res = await cGoL.callStatic.runGameBasic();   
        expect(arraysEqual(res, GLIDER_END)).to.equal(false);
        
        await cGoL.set_game(4, GLIDER_SEED, Math.sqrt(GLIDER_SEED.length));
        res = await cGoL.callStatic.runGameBasic();  
        expect(arraysEqual(res, GLIDER_END)).to.equal(true); 


        await cGoL.set_game(8, HUNDRED_SEED, Math.sqrt(HUNDRED_SEED.length));
        res = await cGoL.callStatic.runGameBasic();   
        expect(arraysEqual(res, HUNDRED_END)).to.equal(true);   
        })
})
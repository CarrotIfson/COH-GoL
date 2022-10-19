
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
import { b1SEED_100P1, b1SEED_100P2, b2SEED_100P1, b2SEED_100P2, b3SEED_100P1, b3SEED_100P2, b4SEED_100P1, b4SEED_100P2, b5SEED_100P1, b5SEED_100P2, bBLINKER_CUBE, bBLINKER_CUBE_ODD, bBLINKER_SEED, bBLINKER_SEED_1P, bBLINKER_SEED_2P, bBLINKER_SEED_EVEN, bBLINKER_SEED_ODD, bCUBE_BLINKER, bCUBE_BLINKER_ODD, bCUBE_EXP_1P, bCUBE_EXP_2P, bCUBE_EXP_SEED, bCUBE_SEED_1P, bCUBE_SEED_2P, bSEED_100P1, bSEED_100P2 } from "../utils/split_patterns";

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


describe("2PBets", function () {
    let owner: SignerWithAddress,
        susan: SignerWithAddress,
        bob: SignerWithAddress,
        carl: SignerWithAddress;

    let cGoL: Contract;
    const duration = 10; //blocks
    let gid = 0;
    /*
    this.beforeEach(async () => { 
    })
    */
    it("Should deploy and set the game 2P", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const CGoL = await ethers.getContractFactory("BGCOLBetting", owner);
        cGoL = await CGoL.deploy();
        console.log(`\tDeployed CGoL contract at ${cGoL.address}`); 
    })


    it("it should test 100cells per player", async function () {
         
        let generations = 50;
        await cGoL.setGameArray2P(10, 10, b1SEED_100P1, duration, generations, 0);   
        await cGoL.connect(susan).joinGame(gid,b1SEED_100P2);
        await moveBlocks(10);       

        let res = await cGoL.getGameGrid(gid);    
        await cGoL.executeGame(gid);
        res = await cGoL.getGameGrid(gid);   
        gid++;


        await cGoL.setGameArray2P(10, 10, b2SEED_100P1, duration, generations, 0);   
        await cGoL.connect(susan).joinGame(gid,b2SEED_100P2);
        await moveBlocks(10);       

        res = await cGoL.getGameGrid(gid);    
        await cGoL.executeGame(gid);
        res = await cGoL.getGameGrid(gid);     
        gid++;


        await cGoL.setGameArray2P(10, 10, b3SEED_100P1, duration, generations, 0);   
        await cGoL.connect(susan).joinGame(gid,b3SEED_100P2);
        await moveBlocks(10);       

        res = await cGoL.getGameGrid(gid);    
        await cGoL.executeGame(gid);
        res = await cGoL.getGameGrid(gid);  
        gid++;


        await cGoL.setGameArray2P(10, 10, b4SEED_100P1, duration, generations, 0);   
        await cGoL.connect(susan).joinGame(gid,b4SEED_100P2);
        await moveBlocks(10);       

        res = await cGoL.getGameGrid(gid);    
        await cGoL.executeGame(gid);
        res = await cGoL.getGameGrid(gid);   
        gid++;


        await cGoL.setGameArray2P(10, 10, b5SEED_100P1, duration, generations, 0);   
        await cGoL.connect(susan).joinGame(gid,b5SEED_100P2);
        await moveBlocks(10);       

        res = await cGoL.getGameGrid(gid);    
        await cGoL.executeGame(gid);
        res = await cGoL.getGameGrid(gid);   
        gid++;

        
    })


    it("it should test 150cells per player", async function () {
    })
})
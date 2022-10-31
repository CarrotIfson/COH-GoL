
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
import { b1SEED_100P1, b1SEED_100P2, b2SEED_100P1, b2SEED_100P2, b3SEED_100P1, b3SEED_100P2, b4SEED_100P1, b4SEED_100P2, b5SEED_100P1, b5SEED_100P2, bBLINKER_CUBE, bBLINKER_CUBE_ODD, bBLINKER_SEED, bBLINKER_SEED_1P, bBLINKER_SEED_2P, bBLINKER_SEED_EVEN, bBLINKER_SEED_ODD, bCUBE_BLINKER, bCUBE_BLINKER_ODD, bCUBE_EXP_1P, bCUBE_EXP_2P, bCUBE_EXP_SEED, bCUBE_SEED, bCUBE_SEED_1P, bCUBE_SEED_2P, bSEED_100P1, bSEED_100P2 } from "../utils/split_patterns";

import { moveBlocks } from "../utils/move_blocks";

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const provider = waffle.provider;

function parseTo18Dec(amount: Number) {
    return ethers.utils.parseUnits(amount.toString(), 18);
}
function parseFromWei(amount: BigNumberish) {
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

async function getBlockTimestamp() {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore); 
    return blockBefore.timestamp;
}


describe("SFGOL", function () {
    let owner: SignerWithAddress,
        susan: SignerWithAddress,
        bob: SignerWithAddress,
        carl: SignerWithAddress;

    let cGoL: Contract;
    const duration = 10; //blocks
    let gid = 0;
    const FRESH = 0
          ,CANCELED = 1
          ,JOINED = 2
          ,REVEALED = 3
          ,SUBMITTED = 4
          ,APPEALED = 5
          ,RESOLVED = 6
          ,CLAIMED = 7;
    /*
    this.beforeEach(async () => { 
    })
    */
    it("Should deploy the contract", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const CGoL = await ethers.getContractFactory("SFGOL", owner);
        cGoL = await CGoL.deploy();
        console.log(`\tDeployed CGoL contract at ${cGoL.address}`); 
    });

    it("Should test owner functions", async function () {
        cGoL.setDevFee(10);
        await expect(cGoL.setDevFee(11)).revertedWith("fee may not exceed 10% of bids");
        await expect(cGoL.connect(susan).setDevFee(11)).revertedWith("onlyOwner");

        cGoL.setMagicNumber(10);
        await expect(cGoL.connect(susan).setMagicNumber(10)).revertedWith("onlyOwner");

        await expect(cGoL.connect(susan).setOwner(susan.address)).revertedWith("onlyOwner");
        await expect(cGoL.setOwner(susan.address));
        await expect(cGoL.setOwner(susan.address)).revertedWith("onlyOwner");
        await expect(cGoL.connect(susan).setMagicNumber(10));
        await expect(cGoL.setDevFee(11)).revertedWith("onlyOwner"); 

        await expect(cGoL.connect(susan).setOwner(owner.address)); 
    });

    it("Should test estimateIterations", async function () {
        await cGoL.connect(owner).setMagicNumber(1000);
        let res = await cGoL.estimateIterations(10*10*10);
        expect(Number(res)).to.equal(1);
        res = await cGoL.estimateIterations(10*10*10+1);
        expect(Number(res)).to.equal(2);
        res = await cGoL.estimateIterations(10*10*20);
        expect(Number(res)).to.equal(2);
        res = await cGoL.estimateIterations(10*10*19);
        expect(Number(res)).to.equal(2);
        res = await cGoL.estimateIterations(10*10*21);
        expect(Number(res)).to.equal(3);
        await cGoL.connect(owner).setMagicNumber(1000);
        res = await cGoL.estimateIterations(4*3*100);
        expect(Number(res)).to.equal(2);
    });

    it("Should test createGame", async function () {
        let deadline = 600;
        let generations = 10;
        let bid = 10; 
        let pBid = parseTo18Dec(bid); 

        let res = await cGoL.getGameCount();
        expect(Number(res)).to.equal(0);
        await expect(cGoL.createGame(10,2,bCUBE_SEED_1P,deadline,generations,0)).revertedWith("_rows and _cols dont match _seed");
        await expect(cGoL.createGame(2,10,bCUBE_SEED_1P,deadline,generations,0)).revertedWith("_rows and _cols dont match _seed");
        
        await expect(cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,pBid)).revertedWith("amount sent should be >= _bid_amount");
        
        await cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,0);
        //TEST GETTERS
        let gid = 0;
        res = await cGoL.getGameState(gid);
        expect(Number(res)).to.equal(FRESH); //FRESH
        await expect(cGoL.getWinner(gid)).revertedWith("no winner determined");;
        let ts = await getBlockTimestamp();
        expect(Number(await cGoL.getDeadline(gid))).to.equal(ts+deadline);
        expect(await cGoL.getGridLength(gid)).to.equal(4);

        await cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,0);
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0,1");

        res = await cGoL.getGameCount();
        expect(Number(res)).to.equal(2);

        //TEST BET HANDLER 
        let init_balance = await owner.getBalance(); 
        await expect(cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,pBid,{value: parseTo18Dec(9)})).revertedWith("amount sent should be >= _bid_amount");
        await cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,pBid,{value: pBid});
        await cGoL.createGame(2,2,bCUBE_SEED_1P,deadline,generations,pBid,{value: parseTo18Dec(100)});
        let fin_balance = await owner.getBalance(); 
        res = parseFromWei(init_balance)-parseFromWei(fin_balance); 
        expect(res).to.be.within(20,21.01); 
        let contract_bal = await provider.getBalance(cGoL.address);
        expect(contract_bal).to.equal(parseTo18Dec(bid*2));

        
    });

    it("Should join the game", async function() { 
        let gid = 2;
        await expect(cGoL.joinGame(gid, bCUBE_SEED_2P)).revertedWith("player1 cant join his own game");
        await expect(cGoL.connect(susan).joinGame(gid, bCUBE_EXP_2P)).revertedWith("non matching seeds");
        await expect(cGoL.connect(susan).joinGame(gid, bCUBE_SEED_2P)).revertedWith("amount sent should be >= _bid_amount");
        await expect(cGoL.connect(susan).joinGame(gid, bCUBE_SEED_2P, {value: parseTo18Dec(9)})).revertedWith("amount sent should be >= _bid_amount");
        await expect(cGoL.connect(susan).joinGame(gid, bCUBE_SEED_1P, {value: parseTo18Dec(10)})).revertedWith("_seed must contain only {0,1}|{0,2} values");
        await expect(cGoL.connect(susan).joinGame(0, bCUBE_SEED_2P, {value: parseTo18Dec(10)})).revertedWith("this _gid does not accept bets");
        
        let prev_balance = parseFromWei(await susan.getBalance());
        await cGoL.connect(susan).joinGame(gid, bCUBE_SEED_2P, {value: parseTo18Dec(55)});
        expect(await cGoL.getInitialSeed(gid)).to.equal(bCUBE_SEED);
        expect(await cGoL.getGameCols(gid)).to.equal(4);
        expect(await cGoL.getGameState(gid)).to.equal(JOINED);
        expect(arraysEqual(await cGoL.getGamePlayers(gid), [owner.address, susan.address])).to.equal(true);
    
        expect((await cGoL.getPlayerGames(susan.address)).toString()).to.equal('2');
        let post_balance =  parseFromWei(await susan.getBalance());
        expect(prev_balance-post_balance).to.be.within(10,10.01); 
    })

    it("Should cancel the game", async function() {
        let gid = 0;
        await expect(cGoL.cancelGame(10)).revertedWith("_gid game not yet created");
        cGoL.cancelGame(gid);
        let state = await cGoL.getGameState(gid);
        expect(state).to.equal(CANCELED);
        //should not allow a player to join a canceled game
        await expect(cGoL.connect(susan).joinGame(0, bCUBE_SEED_2P)).revertedWith("game must be in FRESH state");
        
        gid = 1;
        state = await cGoL.getGameState(gid);
        expect(state).to.equal(FRESH); 
        await expect(cGoL.connect(susan).cancelGame(gid)).revertedWith("only p1 can cancel");
        
        //should fail on a non FRESH game
        gid = 2;
        state = await cGoL.getGameState(gid);
        expect(state).to.equal(JOINED); 
        await expect(cGoL.cancelGame(gid)).revertedWith("can only cancel a FRESH game");
    })

    it("Should execute the game", async function() {
        //Single iteration execution
        let gid = Number(await cGoL.getGameCount());
        let generations = 10;
        let deadline = 600;
        
        await cGoL.createGame(3,4,bCUBE_EXP_1P,deadline,generations,0);
        await expect(cGoL.executeGame(gid)).revertedWith("game must be in JOINED state");
        await cGoL.connect(susan).joinGame(gid,bCUBE_EXP_2P);
        await cGoL.executeGame(gid);
        await expect(cGoL.executeGame(gid)).revertedWith("game must be in JOINED state");
        gid += 1;
        generations = 167;
        await cGoL.createGame(3,4,bCUBE_EXP_1P,deadline,generations,0);
        await expect(cGoL.executeGame(gid)).revertedWith("game must be in JOINED state");
        await cGoL.connect(susan).joinGame(gid,bCUBE_EXP_2P);     
        await cGoL.executeGame(gid);   
        await cGoL.executeGame(gid);   
        await cGoL.executeGame(gid);    
        
    })
/*
    it("it should test 100cells per player", async function () {
         
        let generations = 50;z
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
    })*/
})
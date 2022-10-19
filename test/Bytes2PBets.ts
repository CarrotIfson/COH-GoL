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
import { bBLINKER_SEED, bBLINKER_SEED_1P, bBLINKER_SEED_2P, bBLINKER_SEED_EVEN, bBLINKER_SEED_ODD, bCUBE_SEED_1P, bCUBE_SEED_2P } from "../utils/split_patterns";

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
    /*
    this.beforeEach(async () => { 
    })
    */
    it("Should deploy and set the game 2P", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const CGoL = await ethers.getContractFactory("BGCOLBetting", owner);
        cGoL = await CGoL.deploy();
        console.log(`\tDeployed CGoL contract at ${cGoL.address}`);
         

        //await cGoL.setGameArray2P(5,8,bCUBE_SEED_2P,1,10); 
        await expect(cGoL.setGameArray2P(4, 21, bCUBE_SEED_1P, duration, 10)).revertedWith("_rows and _cols dont match _seed");
        
        await cGoL.setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 10); 
        const endBlock = await ethers.provider.getBlockNumber() + duration;
        let game_grid = await cGoL.getGameGrid(0); 
        
        
        expect(Number(await cGoL.getEndBlock(0))).to.equal(endBlock);  
        expect(game_grid.length).to.equal(bCUBE_SEED_1P.length); 
        expect(Number(await cGoL.getGameCount())).to.equal(1); 
        
        await expect(cGoL.getGameGrid(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getGridLength(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getEndBlock(1)).revertedWith("_gid game not yet created"); 

        
        await cGoL.connect(susan).setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 5); 
        await cGoL.connect(susan).setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 50);
        
        
        expect((await cGoL.getPlayerGames(susan.address)).toString()).to.equal("1,2");  
        expect(Number(await cGoL.getGameCount())).to.equal(3); 
   
    })

    it("Should join the game", async function () {
        
        await expect(cGoL.joinGame(5,bCUBE_SEED_2P)).revertedWith("_gid game not yet created");
        await expect(cGoL.joinGame(0,bCUBE_SEED_2P)).revertedWith("player1 cant join his own game");  
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0");  
        
        expect(await cGoL.getGameState(2)).to.equal(0);
        
        expect((await cGoL.getGamePlayers(2))[1]).to.equal(susan.address); 
        await expect(cGoL.joinGame(2,"00000")).revertedWith("non matching seeds"); 
        await expect(cGoL.joinGame(2,bCUBE_SEED_1P)).revertedWith("_seed must contain only {0,1}|{0,2} values");  
        await cGoL.joinGame(2,bCUBE_SEED_2P);
        let res = await cGoL.getGameGrid(2);
        expect(await cGoL.getGameState(2)).to.equal(1);
        expect((await cGoL.getGamePlayers(2))[1]).to.equal(owner.address);
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0,2");  
        

        await expect(cGoL.connect(bob).joinGame(2, bCUBE_SEED_2P)).revertedWith("game must be in FRESH state"); 
    }) 
    it("Should execute the game", async function () {
       
/*
        console.log(await cGoL.pseudoRandom());
        await moveBlocks(10);  
        console.log(await cGoL.pseudoRandom());
        await moveBlocks(1);  
        console.log(await cGoL.pseudoRandom());
        await moveBlocks(1);  
        console.log(await cGoL.pseudoRandom());
        await moveBlocks(3);  
        console.log(await cGoL.pseudoRandom());
        await moveBlocks(1);  
        console.log(await cGoL.pseudoRandom());
        */
       
        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 2);  
        await cGoL.connect(susan).joinGame(3,bBLINKER_SEED_2P);
        await moveBlocks(10);       

        let res = await cGoL.getGameGrid(3);      
        expect(res).to.equal(bBLINKER_SEED);
        await cGoL.executeGame(3);    
        res = await cGoL.getGameGrid(3);      
        expect(res).to.equal(bBLINKER_SEED);


        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 7);  
        await cGoL.connect(susan).joinGame(4,bBLINKER_SEED_2P);
        await moveBlocks(10);  
        res = await cGoL.getGameGrid(4);      
        expect(res).to.equal(bBLINKER_SEED); 
        await cGoL.executeGame(4);    
        res = await cGoL.getGameGrid(4);      
        expect(res).to.equal(bBLINKER_SEED_ODD);
        /*
 
        await cGoL.setGameArray2P(4, 8, bBLINKER_SEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(4);
        await moveBlocks(10);  
        await cGoL.executeGame(4);    

        res = await cGoL.getGameGrid(4);  
        expect(res).to.equal(bBLINKER_SEED_2P);

 
        await cGoL.setGameArray2P(4, 8, bBLINKER_SEED_2P, 10, 1);  
        await cGoL.connect(susan).joinGame(5);
        await moveBlocks(10);  
        await cGoL.executeGame(5);    

        res = await cGoL.getGameGrid(5);      
        expect(res).to.equal(bBLINKER_ODD_2P);


 
        await cGoL.setGameArray2P(10, 10, bHUNDRED_WSEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(6);
        await moveBlocks(10);  
        await cGoL.executeGame(6);    

        res = await cGoL.getGameGrid(6);  
        expect(res).to.equal(bHUNDRED_WEND_2P);
 
        await cGoL.setGameArray2P(10, 10, bHUNDRED_BSEED_2P, 10, 8);  
        await cGoL.connect(susan).joinGame(7);
        await moveBlocks(10);  
        await cGoL.executeGame(7);    

        res = await cGoL.getGameGrid(7);  
        expect(res).to.equal(bHUNDRED_BEND_2P);
        
        await cGoL.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 1); 

        await cGoL.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 1); 
        await cGoL.connect(susan).joinGame(9); 
        await moveBlocks(15);  
        await cGoL.setRandomizer(9); 
        await cGoL.executeGame(9);   
        res = await cGoL.getGameGrid(9);  
        expect(res).to.equal(bCOLLISION_WWIN_2P);  

        await cGoL.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 10); 
        await cGoL.connect(susan).joinGame(10); 
        await moveBlocks(15);  
        await cGoL.setRandomizer(10); 
        await cGoL.executeGame(10);   
        res = await cGoL.getGameGrid(10);   
        expect(res).to.equal(bCOLLISION_WEND_2P);  
 
        await cGoL.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 6); 
        await cGoL.connect(susan).joinGame(11); 
        await moveBlocks(15);  
        await cGoL.setRandomizerBWin(11); 
        await cGoL.executeGame(11);   
        res = await cGoL.getGameGrid(11);   
        expect(res).to.equal(bCOLLISION_BEND_2P);
            
        await cGoL.setGameArray2P(20, 20, bTWENTY_SQUARE_2P, 1, 10); 
        await cGoL.connect(susan).joinGame(12); 
        await moveBlocks(15);  
        await cGoL.executeGame(12);   
        //res = await cGoL.getGameGrid(12);    
        */
 

        /*
        await cGoL.setGameArray2P(4, 8, BLINKER_SEED_2P, 10, 8); 
        await cGoL.connect(susan).joinGame(4); 
        await moveBlocks(10);  
        await cGoL.executeGame(4);   
        res = await cGoL.getGameGrid(4);  
        expect(arraysEqual(res, BLINKER_SEED_2P)).to.equal(true);

        await cGoL.setGameArray2P(4, 8, BLINKER_SEED_2P, 10, 11); 
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
        //logRectMatrix(10,10,HUNDRED_SEED_2P); 
        //logRectMatrix(10,10,res);
        expect(arraysEqual(res, HUNDRED_WEND_2P)).to.equal(true);

        await cGoL.setGameArray2P(10, 10, HUNDRED_BSEED_2P, 10, 8); 
        await cGoL.connect(susan).joinGame(7); 
        await moveBlocks(10);  
        await cGoL.executeGame(7);   
        res = await cGoL.getGameGrid(7);   
        //logRectMatrix(10,10,HUNDRED_SEED_2P); 
        //logRectMatrix(10,10,res);
        expect(arraysEqual(res, HUNDRED_BEND_2P)).to.equal(true);

        await cGoL.setGameArray2P(19, 13, PUFFER_BSEED_2P, 1, 9); 
        await cGoL.connect(susan).joinGame(8); 
        await moveBlocks(15);  
        await cGoL.executeGame(8);   

        
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
        */
    })
    
})
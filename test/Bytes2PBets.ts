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
import { bBLINKER_CUBE, bBLINKER_CUBE_ODD, bBLINKER_SEED, bBLINKER_SEED_1P, bBLINKER_SEED_2P, bBLINKER_SEED_EVEN, bBLINKER_SEED_ODD, bCUBE_BLINKER, bCUBE_BLINKER_ODD, bCUBE_EXP_1P, bCUBE_EXP_2P, bCUBE_EXP_SEED, bCUBE_SEED_1P, bCUBE_SEED_2P } from "../utils/split_patterns";

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
        await expect(cGoL.setGameArray2P(4, 21, bCUBE_SEED_1P, duration, 10, 0)).revertedWith("_rows and _cols dont match _seed");
        
        await cGoL.setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 10, 0); 
        const endBlock = await ethers.provider.getBlockNumber() + duration;
        let game_grid = await cGoL.getGameGrid(0); 
        
        
        expect(Number(await cGoL.getEndBlock(0))).to.equal(endBlock);  
        expect(game_grid.length).to.equal(bCUBE_SEED_1P.length); 
        expect(Number(await cGoL.getGameCount())).to.equal(1); 
        
        await expect(cGoL.getGameGrid(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getGridLength(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getEndBlock(1)).revertedWith("_gid game not yet created"); 

        
        await cGoL.connect(susan).setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 5, 0); 
        await expect(cGoL.setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 50, 10)).revertedWith("amount sent should be >= _bid_amount"); 
        
        await cGoL.connect(susan).setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 50, parse18Dec(10), {value: parse18Dec(15)});
        
        expect((await cGoL.getPlayerGames(susan.address)).toString()).to.equal("1,2");  
        expect(Number(await cGoL.getGameCount())).to.equal(3); 
    })

    it("Should join the game", async function () { 
        
        await expect(cGoL.joinGame(5,bCUBE_SEED_2P)).revertedWith("_gid game not yet created");
        await expect(cGoL.joinGame(0,bCUBE_SEED_2P)).revertedWith("player1 cant join his own game");  
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0");  
        
        expect(await cGoL.getGameState(2)).to.equal(0);
        expect((await cGoL.getGamePlayers(2))[1]).to.equal(susan.address); 
        
        
        await cGoL.connect(bob).setGameArray2P(2, 2, bCUBE_SEED_1P, duration, 50, parse18Dec(10), {value: parse18Dec(15)});

        await expect(cGoL.joinGame(3,"00000")).revertedWith("non matching seeds"); 
        await expect(cGoL.joinGame(3,bCUBE_SEED_1P,{value: parse18Dec(15)})).revertedWith("_seed must contain only {0,1}|{0,2} values");  
        
        await expect(cGoL.joinGame(3,bCUBE_SEED_2P)).revertedWith("amount sent should be >= _bid_amount");  
        
        await expect(cGoL.joinGame(3,bCUBE_SEED_2P,{value: parse18Dec(9)})).revertedWith("amount sent should be >= _bid_amount");  
        
        await cGoL.joinGame(3,bCUBE_SEED_2P,{value: parse18Dec(15)});
         
        let res = await cGoL.getGameGrid(3);
        expect(await cGoL.getGameState(3)).to.equal(1);
        expect((await cGoL.getGamePlayers(3))[1]).to.equal(owner.address);
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0,3");  
        
            
        await expect(cGoL.connect(bob).joinGame(3, bCUBE_SEED_2P)).revertedWith("game must be in FRESH state"); 
        
    }) 
    it("Should execute the game", async function () {
        
       
        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 2, 0);  
        await cGoL.connect(susan).joinGame(4,bBLINKER_SEED_2P);
        await moveBlocks(10);       

        let res = await cGoL.getGameGrid(4);      
        expect(res).to.equal(bBLINKER_SEED);
        await cGoL.executeGame(4);    
        res = await cGoL.getGameGrid(4);      
        expect(res).to.equal(bBLINKER_SEED);


        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 7, 0);  
        await cGoL.connect(susan).joinGame(5,bBLINKER_SEED_2P);
        await moveBlocks(10);  
        res = await cGoL.getGameGrid(5);      
        expect(res).to.equal(bBLINKER_SEED); 
        await cGoL.executeGame(5);    
        res = await cGoL.getGameGrid(5);      
        expect(res).to.equal(bBLINKER_SEED_ODD); 
    })

    it("Should determine winner", async function () { 
        await cGoL.setGameArray2P(3, 4, bCUBE_EXP_1P, 10, 7, 0);  
        await cGoL.connect(susan).joinGame(6,bBLINKER_SEED_2P);

        await expect( cGoL.setWinnerAndClaim(6)).revertedWith("game must be in FINISHED state");
        await moveBlocks(10);  
        let res = await cGoL.getGameGrid(6);      
        expect(res).to.equal(bCUBE_BLINKER); 
        await cGoL.executeGame(6);    
        res = await cGoL.getGameGrid(6);      
        expect(res).to.equal(bCUBE_BLINKER_ODD); 

        
        await expect( cGoL.getWinner(6)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(6);
        res = await cGoL.getWinner(6);  
        //require(res).to.equal(owner.address); 
        expect(res).to.equal(owner.address); 

        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 7, 0);  
        await cGoL.connect(susan).joinGame(7,bCUBE_EXP_2P);

        await expect( cGoL.setWinnerAndClaim(7)).revertedWith("game must be in FINISHED state");
        await moveBlocks(10);  
        res = await cGoL.getGameGrid(7);      
        expect(res).to.equal(bBLINKER_CUBE); 
        await cGoL.executeGame(7);    
        res = await cGoL.getGameGrid(7);      
        expect(res).to.equal(bBLINKER_CUBE_ODD); 

        
        await expect( cGoL.getWinner(7)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(7);
        res = await cGoL.getWinner(7);   
        expect(res).to.equal(susan.address); 



        await cGoL.setGameArray2P(3, 4, bCUBE_EXP_1P, 10, 7, 0);  
        await cGoL.connect(susan).joinGame(8,bCUBE_EXP_2P);

        await expect( cGoL.setWinnerAndClaim(8)).revertedWith("game must be in FINISHED state");
        await moveBlocks(10);  
        res = await cGoL.getGameGrid(8);      
        expect(res).to.equal(bCUBE_EXP_SEED); 
        await cGoL.executeGame(8);    
        res = await cGoL.getGameGrid(8);      
        expect(res).to.equal(bCUBE_EXP_SEED); 

        
        await expect( cGoL.getWinner(8)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(8);
        res = await cGoL.getWinner(8);   
        expect(res).to.equal("0x0000000000000000000000000000000000000000");  
    })

    it("Should handle the bids winner", async function () { 

        let devSatchet = await cGoL.getDevSatchet();
        let contract_bal = await provider.getBalance(cGoL.address); 
        let winner_bal = await owner.getBalance();
        await cGoL.setGameArray2P(3, 4, bCUBE_EXP_1P, 10, 7, parse18Dec(10), {value: parse18Dec(11)});  
        await cGoL.connect(susan).joinGame(9,bBLINKER_SEED_2P, {value: parse18Dec(11)});
        
        await expect( cGoL.setWinnerAndClaim(9)).revertedWith("game must be in FINISHED state");
        await moveBlocks(10);  
        let res = await cGoL.getGameGrid(9);      
        expect(res).to.equal(bCUBE_BLINKER); 
        await cGoL.executeGame(9);    
        res = await cGoL.getGameGrid(9);      
        expect(res).to.equal(bCUBE_BLINKER_ODD);  
        await expect( cGoL.getWinner(9)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(9);
        res = await cGoL.getWinner(9);  
        //require(res).to.equal(owner.address); 
        expect(res).to.equal(owner.address); 
        let updated_bal = await owner.getBalance();
        res = parseWei(updated_bal)-parseWei(winner_bal); 
        expect(res>9).to.equal(true);

        winner_bal = await susan.getBalance(); 
        let loser_bal = await owner.getBalance(); 
        await cGoL.setGameArray2P(3, 4, bBLINKER_SEED_1P, 10, 7, parse18Dec(500), {value: parse18Dec(500)});  
        await cGoL.connect(susan).joinGame(10,bCUBE_EXP_2P, {value: parse18Dec(500)});
        
        await expect( cGoL.setWinnerAndClaim(10)).revertedWith("game must be in FINISHED state");
        await moveBlocks(10);  
        res = await cGoL.getGameGrid(10);      
        expect(res).to.equal(bBLINKER_CUBE); 
        await cGoL.executeGame(10);    
        res = await cGoL.getGameGrid(10);      
        expect(res).to.equal(bBLINKER_CUBE_ODD);  
        await expect( cGoL.getWinner(10)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(10);
        res = await cGoL.getWinner(10);  
        //require(res).to.equal(owner.address); 
        expect(res).to.equal(susan.address); 
        updated_bal = await susan.getBalance();
        res = parseWei(updated_bal)-parseWei(winner_bal); 
        expect(res>480).to.equal(true);
        updated_bal = await owner.getBalance();
        res = parseWei(loser_bal)-parseWei(updated_bal); 
        expect(res>499).to.equal(true);


        let p1_bal = await owner.getBalance(); 
        let p2_bal = await susan.getBalance(); 
        await cGoL.setGameArray2P(3, 4, bCUBE_EXP_1P, 10, 7, parse18Dec(500), {value: parse18Dec(500)});  
        await cGoL.connect(susan).joinGame(11,bCUBE_EXP_2P, {value: parse18Dec(500)});
        
        await expect( cGoL.setWinnerAndClaim(11)).revertedWith("game must be in FINISHED state");
        await moveBlocks(11);  
        res = await cGoL.getGameGrid(11);      
        expect(res).to.equal(bCUBE_EXP_SEED); 
        await cGoL.executeGame(11);    
        res = await cGoL.getGameGrid(11);      
        expect(res).to.equal(bCUBE_EXP_SEED);  
        await expect( cGoL.getWinner(11)).revertedWith("no winner determined");
        await cGoL.setWinnerAndClaim(11);
        res = await cGoL.getWinner(11);     

        let updated_p1_bal = await owner.getBalance(); 
        let updated_p2_bal = await susan.getBalance();  

        expect(parseWei(p1_bal)-parseWei(updated_p1_bal)>5).to.equal(true);
        expect(parseWei(p2_bal)-parseWei(updated_p2_bal)>5).to.equal(true);

        let updatedSatchet = await cGoL.getDevSatchet();
        expect(parseWei(updatedSatchet)-parseWei(devSatchet)>=1000*0.01+1000*0.01+20*0.01).to.equal(true)
        
        let owner_balance = parseWei(await owner.getBalance());
        await cGoL.claimDevEarnings();
        let updated_owner_balance = parseWei(await owner.getBalance());

            //take gas into account
        expect(0.001+updated_owner_balance-owner_balance >= parseWei(updatedSatchet)).to.equal(true);
        updatedSatchet = await cGoL.getDevSatchet();
        expect(updatedSatchet==0).to.equal(true);
    })
})
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
import { SOME_SEED, CUBE_SEED, O, l, BLINKER_SEED, BEACON_SEED, GLIDER_SEED, GLIDER_END, HUNDRED_SEED, HUNDRED_END, SOME_SEED_2P } from "../utils/patterns";

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

function logRectMatrix(m: Array) {
    const r = Math.sqrt(m.length) * 2;
    console.log("-------------------");
    for (let i = 0; i < r; i++) {
        console.log(m.slice(i * r, i * r + r).toString());
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

        await expect(cGoL.setGameArray2P(2, 4, SOME_SEED_2P, duration, 10)).revertedWith("_rows and _cols dont match _seed");
        await cGoL.setGameArray2P(2, 2, SOME_SEED_2P, duration, 10); 
        const endBlock = await ethers.provider.getBlockNumber() + duration;

        let game_grid = await cGoL.getGameGrid(0);
        expect(Number(await cGoL.getEndBlock(0))).to.equal(endBlock);  
        expect(game_grid.length).to.equal(SOME_SEED_2P.length); 
        expect(Number(await cGoL.getGameCount())).to.equal(1); 

        await expect(cGoL.getGameGrid(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getGridLength(1)).revertedWith("_gid game not yet created"); 
        await expect(cGoL.getEndBlock(1)).revertedWith("_gid game not yet created"); 

        await cGoL.connect(susan).setGameArray2P(2, 2, SOME_SEED_2P, duration, 5); 
        await cGoL.connect(susan).setGameArray2P(2, 2, SOME_SEED_2P, duration, 50);
        
        expect((await cGoL.getPlayerGames(susan.address)).toString()).to.equal("1,2");  
        expect(Number(await cGoL.getGameCount())).to.equal(3); 
    })

    it("Should join the game", async function () {
        await expect(cGoL.joinGame(5)).revertedWith("_gid game not yet created");
        await expect(cGoL.joinGame(0)).revertedWith("player1 cant join his own game");  
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0");  
        
        expect(await cGoL.getGameState(2)).to.equal(0);
        cGoL.joinGame(2);
        expect(await cGoL.getGameState(2)).to.equal(1);
        expect((await cGoL.getPlayerGames(owner.address)).toString()).to.equal("0,2");  
        
        /*
        await cGoL.setGameArrayBasic(duration, CUBE_SEED, Math.sqrt(CUBE_SEED.length));  
        let res = await cGoL.callStatic.runGameArrayBasic(); 

        expect(arraysEqual(res, CUBE_SEED)).to.equal(true);
        await cGoL.setGameArrayBasic(3, BLINKER_SEED, Math.sqrt(BLINKER_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();  

        expect(arraysEqual(res, BLINKER_SEED)).to.equal(false);
        await cGoL.setGameArrayBasic(8, BLINKER_SEED, Math.sqrt(BLINKER_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();  
        expect(arraysEqual(res, BLINKER_SEED)).to.equal(true);  

        await cGoL.setGameArrayBasic(1, BEACON_SEED, Math.sqrt(BEACON_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();   
        expect(arraysEqual(res, BEACON_SEED)).to.equal(false);
        await cGoL.setGameArrayBasic(6, BEACON_SEED, Math.sqrt(BEACON_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();  
        expect(arraysEqual(res, BEACON_SEED)).to.equal(true); 
        await cGoL.setGameArrayBasic(1, GLIDER_SEED, Math.sqrt(GLIDER_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();   
        expect(arraysEqual(res, GLIDER_END)).to.equal(false);
        
        await cGoL.setGameArrayBasic(4, GLIDER_SEED, Math.sqrt(GLIDER_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();  
        expect(arraysEqual(res, GLIDER_END)).to.equal(true); 


        await cGoL.setGameArrayBasic(8, HUNDRED_SEED, Math.sqrt(HUNDRED_SEED.length));
        res = await cGoL.callStatic.runGameArrayBasic();   
        expect(arraysEqual(res, HUNDRED_END)).to.equal(true);   
        */
    })
})
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
import { SOME_SEED, CUBE_SEED, O, l, BLINKER_SEED, BEACON_SEED, GLIDER_SEED, GLIDER_END, HUNDRED_SEED, HUNDRED_END, SOME_SEED_2P, CUBE_SEED_2P, BLINKER_SEED_2P, BLINKER_ODD_2P, HUNDRED_SEED_2P, HUNDRED_END_2P, HUNDRED_WEND_2P, HUNDRED_BSEED_2P, HUNDRED_WSEED_2P, HUNDRED_BEND_2P, PUFFER_WSEED_2P, PUFFER_BSEED_2P, COLLISION_SEED_2P, COLLISION_WWIN_2P, COLLISION_WEND_2P, COLLISION_BEND_2P, bSOME_SEED_2P, bCUBE_SEED_2P, bCUBE_SEED_2Pv, bBLINKER_SEED_2P, bBLINKER_ODD_2P, wbBLINKER_SEED_2P, bHUNDRED_WSEED_2P, bHUNDRED_WEND_2P, bHUNDRED_BSEED_2P, bHUNDRED_BEND_2P, bCOLLISION_SEED_2P, bCOLLISION_WWIN_2P, bCOLLISION_WEND_2P, bCOLLISION_BEND_2P, bTHIRSTY_SQUARE_2P, bTWENTY_SQUARE_2P, bFIFTEEN_SQUARE_2P, TEST_LAYOUT } from "../utils/patterns";

import { moveBlocks } from "../utils/move_blocks";


import _data from '../app.json';

interface Data {
    keys: string[],
    vals: string[]
}


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

const delay = ms => new Promise(res => setTimeout(res, ms));

describe("Bytes2P", function () {
    let owner: SignerWithAddress,
        susan: SignerWithAddress,
        bob: SignerWithAddress,
        carl: SignerWithAddress;

    let lugol: Contract;
    let lu: Contract;
    const duration = 10; //blocks
    /*
    this.beforeEach(async () => { 
    })
    */
    it("Should deploy and set the game 2P", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const LU = await ethers.getContractFactory("LOOKUP", owner);
        lu = await LU.deploy();

        const LUGOL = await ethers.getContractFactory("LUGOL", owner);
        lugol = await LUGOL.deploy(lu.address);
        console.log(`\tDeployed CGoL contract at ${lugol.address}`);
 

        //await cGoL.setGameArray2P(5,8,bCUBE_SEED_2P,1,10); 
        await expect(lugol.setGameArray2P(2, 4, bSOME_SEED_2P, duration, 10)).revertedWith("_rows and _cols dont match _seed");
        
        await lugol.setGameArray2P(5, 8, bCUBE_SEED_2P, 10, 2);
        await lugol.setGameArray2P(5, 8, bCUBE_SEED_2P, 10, 2);
        await lugol.setGameArray2P(5, 8, bCUBE_SEED_2P, 10, 2);
   
    }) 
    
    it("Should fill the LookUpTable", async function () {
        const dt = _data as Data[];
        const keys = dt.keys;
        const vals = dt.vals;
          

        const iterations = 40;
        let slice_size = parseInt(keys.length/iterations);  
        let consumed = 0
        let k, v;
        for (let i = 0; i < iterations;i++) { //iterations; i++) { 
            
            k = keys.slice(consumed, consumed + slice_size)
            v = vals.slice(consumed, consumed + slice_size)
 
            await lu.load_cell_solver(k,v);
            consumed += slice_size;
            console.log(`loaded ${consumed}`)  
        }
        
        k = keys.slice(consumed)
        v = vals.slice(consumed)  
        await lu.load_cell_solver(k,v); 
        
        /*
        let map_value = await lu.solve_cell("011122200"); 
        console.log(`solve_cell ${map_value}`);
        map_value = await lu.test(); 
        console.log(`test ${map_value}`);
        map_value = await lu.testB(); 
        console.log(`testB ${map_value}`);
        map_value = await lu.testB1(); 
        console.log(`testEncoded ${map_value}`);  
        map_value = await lu.testB2(); 
        console.log(`testEncoded2 ${map_value}`);  */
    })

    it("Should test gas ", async function () {
        
        //await lugol.setGameArray2P(5, 8, bCUBE_SEED_2P, 10, 2);
         
        await lugol.setGameArray2P(5, 8, bCUBE_SEED_2P, 10, 4);  
        await lugol.connect(susan).joinGame(3);
        await moveBlocks(10);  
        await lugol.executeGame(3);    
        let res = await lugol.getGameGrid(3);   
         
        expect(res).to.equal(bCUBE_SEED_2P);
         
 
        await lugol.setGameArray2P(4, 8, bBLINKER_SEED_2P, 10, 8);  
        await lugol.connect(susan).joinGame(4);
        await moveBlocks(10);  
        await lugol.executeGame(4);  
        res = await lugol.getGameGrid(4);  
        expect(res).to.equal(bBLINKER_SEED_2P); 
 
        await lugol.setGameArray2P(4, 8, bBLINKER_SEED_2P, 10, 1);  
        await lugol.connect(susan).joinGame(5);
        await moveBlocks(10);  
        await lugol.executeGame(5);   
        res = await lugol.getGameGrid(5);      
        expect(res).to.equal(bBLINKER_ODD_2P);

        
        await lugol.setGameArray2P(10, 10, bHUNDRED_WSEED_2P, 10, 8);  
        await lugol.connect(susan).joinGame(6);
        await moveBlocks(10);  
        await lugol.executeGame(6); 
        res = await lugol.getGameGrid(6);  
        expect(res).to.equal(bHUNDRED_WEND_2P);
 

        await lugol.setGameArray2P(10, 10, bHUNDRED_BSEED_2P, 10, 8);  
        await lugol.connect(susan).joinGame(7);
        await moveBlocks(10);  
        await lugol.executeGame(7);   
        res = await lugol.getGameGrid(7);  
        expect(res).to.equal(bHUNDRED_BEND_2P);
        

        await lugol.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 1); 

        await lugol.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 1); 
        await lugol.connect(susan).joinGame(9); 
        await moveBlocks(15);  
        await lugol.setRandomizer(9); 
        await lugol.executeGame(9);   
        res = await lugol.getGameGrid(9);  
        expect(res).to.equal(bCOLLISION_WWIN_2P);  

        await lugol.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 10); 
        await lugol.connect(susan).joinGame(10); 
        await moveBlocks(15);  
        await lugol.setRandomizer(10); 
        await lugol.executeGame(10);   
        res = await lugol.getGameGrid(10);   
        expect(res).to.equal(bCOLLISION_WEND_2P);  
 
        await lugol.setGameArray2P(3, 5, bCOLLISION_SEED_2P, 1, 6); 
        await lugol.connect(susan).joinGame(11); 
        await moveBlocks(15);  
        await lugol.setRandomizerBWin(11); 
        await lugol.executeGame(11);   
        res = await lugol.getGameGrid(11);   
        expect(res).to.equal(bCOLLISION_BEND_2P);
          
        await lugol.setGameArray2P(15, 15, bFIFTEEN_SQUARE_2P, 1, 20); 
        await lugol.connect(susan).joinGame(12); 
        await moveBlocks(15);  
        await lugol.setRandomizerBWin(12); 
        await lugol.executeGame(12);   

        /*
        await cGoL.setGameArray2P(20, 20, bTWENTY_SQUARE_2P, 1, 10); 
        await cGoL.connect(susan).joinGame(13); 
        await moveBlocks(15);  
        await cGoL.setRandomizerBWin(13); 
        await cGoL.executeGame(13); 
        */
        
        //res = await cGoL.getGameGrid(12);    
         
    })
    
})
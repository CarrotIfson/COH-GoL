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
import { SOME_SEED, CUBE_SEED, O, l, BLINKER_SEED, BEACON_SEED, GLIDER_SEED, GLIDER_END, HUNDRED_SEED, HUNDRED_END, SOME_SEED_2P, CUBE_SEED_2P, BLINKER_SEED_2P, BLINKER_ODD_2P, HUNDRED_SEED_2P, HUNDRED_END_2P, HUNDRED_WEND_2P, HUNDRED_BSEED_2P, HUNDRED_WSEED_2P, HUNDRED_BEND_2P, PUFFER_WSEED_2P, PUFFER_BSEED_2P, COLLISION_SEED_2P, COLLISION_WWIN_2P, COLLISION_WEND_2P, COLLISION_BEND_2P, bSOME_SEED_2P, bCUBE_SEED_2P, bCUBE_SEED_2Pv, bBLINKER_SEED_2P, bBLINKER_ODD_2P, wbBLINKER_SEED_2P, bHUNDRED_WSEED_2P, bHUNDRED_WEND_2P, bHUNDRED_BSEED_2P, bHUNDRED_BEND_2P, bCOLLISION_SEED_2P, bCOLLISION_WWIN_2P, bCOLLISION_WEND_2P, bCOLLISION_BEND_2P, bTHIRSTY_SQUARE_2P, bTWENTY_SQUARE_2P, bFIFTEEN_SQUARE_2P } from "../utils/patterns";

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
function parseBN(amount: BigNumberish) {
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


describe("lookUp", function () {
    let owner: SignerWithAddress,
        susan: SignerWithAddress,
        bob: SignerWithAddress,
        carl: SignerWithAddress;

    let lp: Contract; 
    /*
    this.beforeEach(async () => { 
    })
    */
    it("Should deploy ", async function () {
        [owner, susan, bob, carl] = await ethers.getSigners();
        const LP = await ethers.getContractFactory("LOOKUP", owner);
        lp = await LP.deploy();
        console.log(`\tDeployed CGoL contract at ${lp.address}`);      
    }) 
    
    
    it("Should test logic", async function () {
        const dt = _data as Data[];
        const keys = dt.keys;
        const vals = dt.vals;

        const iterations = 15;
        let slice_size = parseInt(keys.length/iterations);  
        let consumed = 0
        let k, v;
        for (let i = 0; i < iterations; i++) {
            k = keys.slice(consumed, consumed + slice_size)
            v = vals.slice(consumed, consumed + slice_size)  

            consumed += slice_size;
            await lp.load_cell_solver(k,v);
            console.log(`loaded ${consumed}`)
        }
        
        k = keys.slice(consumed)
        v = vals.slice(consumed)  
        await lp.load_cell_solver(k,v); 
        let map_value = await lp.solve_cell("22222222"); 
        console.log(map_value)
        /*
        let cell = '0';
        let layout = '11122200';

        let ones = '0';
        let twos = '0';

        let res = await lp.generateResult(cell, layout); 
        let map_value = await lp.solve_cell(cell+ones+twos);
 
        console.log(map_value);

        cell = '0';
        layout = '11122200';

        ones = '3';
        twos = '0';

        res = await lp.generateResult(cell, layout); 
        map_value = await lp.solve_cell(cell+ones+twos);
 
        console.log(map_value);*/
    })
    
})
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract LOOKUP {     
    mapping( string => string) cell_solver;
    address immutable owner; 

    constructor() {
        owner = msg.sender;
    }

 
    function solve_cell(string memory setup) public view returns(bytes1){//string  memory) {
        string memory s = cell_solver[setup]; 
        return(bytes(s)[0]);
        
        /*
        return cell_solver[setup];
        */
    }

    function solve_cell_string(string memory setup) public view returns(string memory) { 
        return  cell_solver[setup];
    }

    function checkLayout(bytes memory cell_layout) private pure { 
        for(uint i=0; i<cell_layout.length; ) {
            if(cell_layout[i]!="0" &&
                cell_layout[i]!="1" &&
                cell_layout[i]!="2") {
                    revert("_seed must contain only {1,2,3} values");
                } 
            unchecked{ i++;}
        }
        require(cell_layout.length == 8, "cell_layout should have size 8");
    }

    function generateResult(uint cell, string memory str_cell_layout) public pure returns (uint) {
        /*
            Just a way of verifying the logic applied to the mapping result
            NW N NE  || [0] [1] [2]
            W  C  E  || [3]  C  [4]
            SW S SE  || [5] [6] [7]

        */
        require(cell == 0 || cell == 1 || cell == 2, "cell must be {0|1|2}");
        bytes memory cell_layout = bytes(str_cell_layout);
        checkLayout(cell_layout);

        uint8 wNeigh;
        uint8 bNeigh;
        uint8 diff;
        //NW
        if(cell_layout[0]=='1') {
            wNeigh++;
        } else if(cell_layout[0]=='2') {
            bNeigh++;
        }
        //N
        if(cell_layout[1]=='1') {
            wNeigh++;
        } else if(cell_layout[1]=='2') {
            bNeigh++;
        }
        //NE
        if(cell_layout[2]=='1') {
            wNeigh++;
        } else if(cell_layout[2]=='2') {
            bNeigh++;
        } 
        //W
        if(cell_layout[3]=='1') {
            wNeigh++;
        } else if(cell_layout[3]=='2') {
            bNeigh++;
        } 
        //E
        if(cell_layout[4]=='1') {
            wNeigh++;
        } else if(cell_layout[4]=='2') {
            bNeigh++;
        } 
        //SW
        if(cell_layout[5]=='1') {
            wNeigh++;
        } else if(cell_layout[5]=='2') {
            bNeigh++;
        }  
        //S
        if(cell_layout[6]=='1') {
            wNeigh++;
        } else if(cell_layout[6]=='2') {
            bNeigh++;
        } 
        //SE
        if(cell_layout[7]=='1') {
            wNeigh++;
        } else if(cell_layout[7]=='2') {
            bNeigh++;
        } 
 
        //EMPTY
        if(cell == 0) {
            if(wNeigh == 3){ //if has 3 wNeighs
                if(bNeigh == 3) { //AND 3 bNeighs 
                    return 3;//random flag
                }             
                return 1;                
            } else if(bNeigh == 3) { //if it has 3 bNeighs and wNeighs != 3
                return 2;
            } else {
                return 0;
            } 
        } 
        if(bNeigh > wNeigh) {
            diff = bNeigh - wNeigh;
        } else {
            diff = wNeigh - bNeigh; 
        }
        //WHITE
        if(cell == 1) {
            if(diff == 1 && wNeigh == 1) {
                return 0;
            }
            if(diff != 2 && diff != 3) {
                return 0;
            }
            return 1; 
        } 
        //BLACK
        if(cell == 2) {
            if(diff == 1 && bNeigh == 1) {
                return 0;
            }
            if(diff != 2 && diff != 3) {
                return 0;
            }
            return 2; 
        } 

        //won't get here
        return 99999; 
    }

    function load_cell_solver(string[] memory keys, string[] memory values) public onlyOwner() {
        require(keys.length == values.length, "arrays must be of same length");
        for(uint i=0; i<keys.length; i++) { 
            cell_solver[keys[i]] = values[i];//;    
        } 
         
        
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner allowed");
        _;
    }

    function _init_cell_solver_old() private {
    /*
        XYZ = X'
        where X  is the current cell state
                Y  is the n. of white neighbouring cells
                Z  is the n. of black neighbouring cells
                X' is the resulting state of the cell 
                    0 = EMPTY
                    1 = WHITE
                    2 = BLACK
                    3 = [WHITE|BLACK]
    */
    cell_solver["000"] = "0";
    cell_solver["100"] = "0";
    cell_solver["200"] = "0";
    cell_solver["010"] = "0";
    cell_solver["110"] = "0";
    cell_solver["210"] = "0";
    cell_solver["001"] = "0";
    cell_solver["101"] = "0";
    cell_solver["201"] = "0";
    cell_solver["020"] = "0";
    cell_solver["120"] = "0";
    cell_solver["220"] = "0";
    cell_solver["011"] = "0";
    cell_solver["111"] = "0";
    cell_solver["211"] = "0";
    cell_solver["002"] = "0";
    cell_solver["102"] = "0";
    cell_solver["202"] = "0";
    cell_solver["030"] = "1";
    cell_solver["130"] = "0";
    cell_solver["230"] = "0";
    cell_solver["021"] = "0";
    cell_solver["121"] = "0";
    cell_solver["221"] = "0";
    cell_solver["012"] = "0";
    cell_solver["112"] = "0";
    cell_solver["212"] = "0";
    cell_solver["003"] = "2";
    cell_solver["103"] = "0";
    cell_solver["203"] = "0";
    cell_solver["040"] = "0";
    cell_solver["140"] = "0";
    cell_solver["240"] = "0";
    cell_solver["031"] = "1";
    cell_solver["131"] = "0";
    cell_solver["231"] = "0";
    cell_solver["022"] = "0";
    cell_solver["122"] = "0";
    cell_solver["222"] = "0";
    cell_solver["013"] = "2";
    cell_solver["113"] = "0";
    cell_solver["213"] = "0";
    cell_solver["004"] = "0";
    cell_solver["104"] = "0";
    cell_solver["204"] = "0";
    cell_solver["050"] = "0";
    cell_solver["150"] = "0";
    cell_solver["250"] = "0";
    cell_solver["041"] = "0";
    cell_solver["141"] = "0";
    cell_solver["241"] = "0";
    cell_solver["032"] = "1";
    cell_solver["132"] = "0";
    cell_solver["232"] = "0";
    cell_solver["023"] = "2";
    cell_solver["123"] = "0";
    cell_solver["223"] = "0";
    cell_solver["014"] = "0";
    cell_solver["114"] = "0";
    cell_solver["214"] = "0";
    cell_solver["005"] = "0";
    cell_solver["105"] = "0";
    cell_solver["205"] = "0";
    cell_solver["060"] = "0";
    cell_solver["160"] = "0";
    cell_solver["260"] = "0";
    cell_solver["051"] = "0";
    cell_solver["151"] = "0";
    cell_solver["251"] = "0";
    cell_solver["042"] = "0";
    cell_solver["142"] = "0";
    cell_solver["242"] = "0";
    cell_solver["033"] = "3";
    cell_solver["133"] = "0";
    cell_solver["233"] = "0";
    cell_solver["024"] = "0";
    cell_solver["124"] = "0";
    cell_solver["224"] = "0";
    cell_solver["015"] = "0";
    cell_solver["115"] = "0";
    cell_solver["215"] = "0";
    cell_solver["006"] = "0";
    cell_solver["106"] = "0";
    cell_solver["206"] = "0";
    cell_solver["070"] = "0";
    cell_solver["170"] = "0";
    cell_solver["270"] = "0";
    cell_solver["061"] = "0";
    cell_solver["161"] = "0";
    cell_solver["261"] = "0";
    cell_solver["052"] = "0";
    cell_solver["152"] = "0";
    cell_solver["252"] = "0";
    cell_solver["043"] = "2";
    cell_solver["143"] = "0";
    cell_solver["243"] = "0";
    cell_solver["034"] = "1";
    cell_solver["134"] = "0";
    cell_solver["234"] = "0";
    cell_solver["025"] = "0";
    cell_solver["125"] = "0";
    cell_solver["225"] = "0";
    cell_solver["016"] = "0";
    cell_solver["116"] = "0";
    cell_solver["216"] = "0";
    cell_solver["007"] = "0";
    cell_solver["107"] = "0";
    cell_solver["207"] = "0";
}

}
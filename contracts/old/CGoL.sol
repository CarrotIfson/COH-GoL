// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract GCOL {
    uint256 public end_block; // in blocks
    uint8 public duration;
    bool[] public game_grid;
    uint8[] public game_grid_2p;
    uint8 public grid_length; 
    address public winner;

    uint8 public rows; 
    uint8 public cols; 

    /*
    constructor(uint256 _duration, bool[] memory _seed) {
        end_block = block.number + _duration;
        game_grid = _seed;
        grid_size = _seed.length;
    }
    */
    /*
    enum State { WAITING, ONGOING, FINISHED}
    struct Game {
        uint8 rows;
        uint8 cols;
        uint8[] game_grid;
        address player1;
        address player2;
        uint bid;
        uint256 start_block;
        uint256 end_block;
        uint256 iterations;
        State state;
    }

    Game instance;
    */
    function setGameArrayBasic(uint8 _duration, bool[] memory _seed, uint8 _grid_length) public {
        require(_grid_length*_grid_length == _seed.length, "grid should be a square");
        require(_grid_length < 15, "Max row length is 15");
        game_grid = _seed;
        grid_length = _grid_length;
        end_block = block.number + _duration; 
        duration = _duration;
        //console.log("block in fnc: ", block.number); 
    }

/*
    function setGameArray2P(uint8 _rows, uint8 _cols, uint8[] memory _seed, uint8 _duration, uint8 _iterations) public {
        require(_rows*_cols == _seed.length, "_rows and _cols dont match _seed");
        //require(_grid_length < 15, "Max row length is 15"); TODO eventually see which is the biggest array we can handle with 60M Gas
        instance = Game(
            _rows,
            _cols,
            _seed,
            msg.sender, 
            msg.sender, //player2
            10, //bid
            block.number,
            block.number + _duration,
            _iterations,
            State.WAITING
        );
    }
*/

    function copyArray(bool[] memory arr) public pure returns (bool[] memory) {
        bool[] memory res = new bool[](arr.length);
        
        for(uint8 x=0; x<arr.length; ){
            res[x] = arr[x];
            unchecked {x++;}
        } 
        return res; 
    }

    function runGameArrayBasic() public returns(bool[] memory _game_grid) {  
        /*
            r   r    r
        c   NW  N   NE
        c   W  CELL  E
        c   SW  S   SE
        */ 
        _game_grid = game_grid;
        bool[] memory _res_game_grid = copyArray(_game_grid);
        uint8 num_alive_neighs;
        uint8 grid_size = grid_length * grid_length;
        bool isTopRow;
        bool isBottomRow;
        bool isLeftEdge;
        bool isRightEdge;
 
        for(uint i=0; i<duration; ) {   
            for(uint c=0; c < grid_size; ) { 
                num_alive_neighs = 0; 
                isTopRow = c < grid_length;
                isBottomRow = c >= grid_length*(grid_length-1);
                isLeftEdge = c % grid_length == 0;
                isRightEdge = (c +1) % grid_length == 0; 
                // NW
                if(!isTopRow && !isLeftEdge && _game_grid[c-grid_length-1]) {
                    num_alive_neighs++;
                }
                // N
                if(!isTopRow && _game_grid[c-grid_length]) {
                    num_alive_neighs++; 
                }
                // NE
                if(!isTopRow && !isRightEdge && _game_grid[c-grid_length+1]) {
                    num_alive_neighs++; 
                } 
                // W
                if(!isLeftEdge && _game_grid[c-1]) {
                    num_alive_neighs++; 
                } 
                // E
                if(!isRightEdge && _game_grid[c+1]) {
                    num_alive_neighs++; 
                } 
                // SW
                if(!isBottomRow && !isLeftEdge  && _game_grid[c+grid_length-1]) {
                    num_alive_neighs++; 
                }
                // S
                if(!isBottomRow && _game_grid[c+grid_length]) {
                    num_alive_neighs++; 
                }
                // SE
                if(!isBottomRow && !isRightEdge && _game_grid[c+grid_length+1]) {
                    num_alive_neighs++; 
                }   
                if (_game_grid[c]) { 
                    if (num_alive_neighs == 2 || num_alive_neighs == 3) { 
                        _res_game_grid[c] = true;
                    } else { 
                        _res_game_grid[c] = false;
                    }
                } else {
                    if (num_alive_neighs == 3) { 
                        _res_game_grid[c] = true;
                    } else { 
                        _res_game_grid[c] = false;
                    }
                }
                unchecked { c += 1; }  
            }  
            unchecked { i += 1; }
            _game_grid =  copyArray(_res_game_grid);
        }
        winner = msg.sender;
        return _game_grid;
    } 

    function getGameGrid() public view returns(bool[] memory) {
        return game_grid;
    }
    function getEndBlock() public view returns(uint256) {
        return end_block;
    }
    function getGridLength() public view returns(uint256) {
        return grid_length;
    }
}
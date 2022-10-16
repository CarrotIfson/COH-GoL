// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract GCOL2P { 


    /*
    constructor(uint256 _duration, bool[] memory _seed) {
        end_block = block.number + _duration;
        game_grid = _seed;
        grid_size = _seed.length;
    }
    */
    enum State { FRESH, WAITING, FINISHED}
    struct Game {
        uint256 rows;
        uint256 cols;
        uint256 grid_length;
        uint8[] game_grid; 
        address player1;
        address player2;
        uint bid;
        uint256 start_block;
        uint256 end_block;
        uint256 iterations;
        State state;
        address winner;
        bytes32 randomizer;
    }
 
    mapping(uint256 => Game) private game_instances ;
    mapping(address => uint256[]) private player_games; 
    uint256 private game_count; 

    function check_grid(uint8[] calldata _seed) private pure {
        for(uint i=0; i<_seed.length; ) {
            if(_seed[i]!=0 &&
                _seed[i]!=1 &&
                _seed[i]!=2) {
                    revert("_seed must contain only {1,2,3} values");
                } 
            unchecked{ i++;}
        }
    }

    function setGameArray2P(uint256 _rows, uint256 _cols, uint8[] calldata _seed, uint256 _duration, uint256 _iterations) public {
        require(_rows*_cols == _seed.length, "_rows and _cols dont match _seed");
        check_grid(_seed);
        //require(_grid_length < 15, "Max row length is 15"); TODO eventually see which is the biggest array we can handle with 60M Gas
        game_instances[game_count] = Game(
            _rows,
            _cols,
            _rows*_cols,
            _seed,
            msg.sender, 
            msg.sender, //player2
            10, //bid
            block.number,
            block.number + _duration,
            _iterations,
            State.FRESH,
            address(0),
            bytes32(0)
        );
        player_games[msg.sender].push(game_count);
        game_count++;
    }

    function copyArray(uint8[] memory arr) public pure returns (uint8[] memory) {
        uint8[] memory res = new uint8[](arr.length);
        
        for(uint8 x=0; x<arr.length; ){
            res[x] = arr[x];
            unchecked {x++;}
        } 
        return res; 
    }


    function runIterations(uint _gid) private view returns(uint8[] memory){ //returns(uint8[] memory) {  
        
        //      c   c    c
        //  r   NW  N   NE
        //  r   W  CELL  E
        //  r   SW  S   SE
        

        Game memory game = game_instances[_gid];
        uint8[] memory game_grid = game.game_grid;
        
        uint8[] memory _res_game_grid = copyArray(game_grid);
        //bool isTopRow;
        //bool isBottomRow;
        bool isLeftCol;
        bool isRightCol;  
 

        uint8[] memory neighs = new uint8[](3);
 
        uint256 cell; 
        //uint8 cols = game.cols; 
        //uint8 rows = game.rows;
        uint256 bottom_delimiter = (game.rows-1)*game.cols;
    
        uint256 top_delta;
        uint256 bottom_delta;

        uint8 diff;
    
 
        for(uint i=0; i<game.iterations; ) { 
            /*for(r = 0; r < rows; ) {
                if(r )
                console.log("\tRow: ", r);
                //check if its top or bottom row
                for(c = 0; c < cols; ) {
                    console.log("\t\tCol: ", c);
                    unchecked{c++;}
                } 
                unchecked{r++;}
            }*/
            for(cell=0; cell<game.grid_length; ) {
                
                //num_wNeighs = 0;
                //num_bNeighs = 0;

                neighs[0] = 0;
                neighs[1] = 0;
                neighs[2] = 0;
                /*
                isTopRow = cell < cols;
                isBottomRow = cell >= bottom_delimiter;
                */
                isLeftCol = cell % game.cols == 0; 
                isRightCol = (cell+1) % game.cols == 0;

                /*
                if(isTopRow) {
                    console.log("In top row, cell", cell);
                }
                if(isBottomRow) {
                    console.log("In bottom row, cell", cell);
                }
                if(isLeftCol) {
                    console.log("In left col, cell", cell);
                }
                if(isRightCol) {
                    console.log("In right col, cell", cell);
                }*/
                
                if(cell >= game.cols) { //!isTopRow
                    top_delta = cell-game.cols;
                    // SW
                    if(!isLeftCol) {
                        neighs[game_grid[top_delta-1]]++;
                    }
                    // S
                    neighs[game_grid[top_delta]]++;
                    // SE
                    if(!isRightCol) {
                        neighs[game_grid[top_delta+1]]++; 
                    }

                }
                
                if(cell < bottom_delimiter) { //!isBottomRow
                    bottom_delta = cell+game.cols;
                    // SW
                    if(!isLeftCol) {
                        neighs[game_grid[bottom_delta-1]]++;
                    }
                    // S
                    neighs[game_grid[bottom_delta]]++;
                    // SE
                    if(!isRightCol) {
                        neighs[game_grid[bottom_delta+1]]++; 
                    }

                }
                // W
                if(!isLeftCol){
                    neighs[game_grid[cell-1]]++;
                } 
                // E
                if(!isRightCol) {
                    neighs[game_grid[cell+1]]++;
                }  
                /*
                //NW 
                if(!isTopRow && !isLeftCol) { //} && _game_grid[c-grid_length-1]!=0) { 
                    neighs[game_grid[cell-cols-1]]++;
                }
                //N
                if(!isTopRow) { //} && _game_grid[c-grid_length-1]!=0) { 
                    neighs[game_grid[cell-cols]]++;
                }
                //NE
                if(!isTopRow && !isRightCol) { //} && _game_grid[c-grid_length-1]!=0) { 
                    neighs[game_grid[cell-cols+1]]++;
                }
                // SW
                if(!isBottomRow && !isLeftCol) {
                    neighs[game_grid[cell+cols-1]]++;
                }
                // S
                if(!isBottomRow) {
                    neighs[game_grid[cell+cols]]++;
                }
                // SE
                if(!isBottomRow && !isRightCol) {
                    neighs[game_grid[cell+cols+1]]++;
                }
                */
                 
                if(game_grid[cell]==0) { //EMPTY
                    if(neighs[1] == 3) { //If has 3 wNei
                        if(neighs[2] == 3) { //AND 3 bNei
                            //choose randomly
                            _res_game_grid[cell] = uint8(game.randomizer[(i+cell)%32] & 0x01)+1;
                        } else {            //if bNei != 3 
                            _res_game_grid[cell] = 1;
                        }
                    } else if (neighs[2] == 3) { // if bNei is 3
                        _res_game_grid[cell] = 2; 
                    }
                } else  {  
                    if(neighs[2] > neighs[1]) {
                        diff = neighs[2] - neighs[1];
                    } else {
                        diff = neighs[1] - neighs[2]; 
                    }
                    
                    if (game_grid[cell]==1) { //WHITE 
                        if(diff == 1 && neighs[1] == 1) {
                            _res_game_grid[cell] = 0;  
                        }
                        else if(diff != 2 && diff != 3) {
                            _res_game_grid[cell] = 0; 
                        }
                    } else {        
                        if(diff == 1 && neighs[2] == 1) {
                            _res_game_grid[cell] = 0;  
                        }
                        else if(diff != 2 && diff != 3) {
                            _res_game_grid[cell] = 0; 
                        }           //BLACK 
                    }
                }
                unchecked{cell++;} 
            }
            unchecked{i++;}
            //if(i<game.iterations-1) { 
            game_grid = copyArray(_res_game_grid);
            //}
        } 
        //game_instances[_gid].game_grid = game_grid;
        return _res_game_grid; 
    } 


    modifier gameExists(uint _gid) {
        require(_gid < game_count, "_gid game not yet created");
        _;
    }
 
    function joinGame(uint _gid) gameExists(_gid) public {
        require(game_instances[_gid].state == State.FRESH, "game must be in FRESH state");
        require(game_instances[_gid].player1 !=  msg.sender, "player1 cant join his own game");
        
        game_instances[_gid].state = State.WAITING;
        game_instances[_gid].player2 = msg.sender; 
        game_instances[_gid].randomizer = keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender)); 
        player_games[msg.sender].push(_gid);
    }

    function executeGame(uint _gid) gameExists(_gid) public {//returns(uint8[] memory) {
        require(game_instances[_gid].state == State.WAITING, "game must be in WAITING state");
        require(game_instances[_gid].end_block <= block.number, "need to reach end_block");
        game_instances[_gid].game_grid = runIterations(_gid);
        game_instances[_gid].state = State.FINISHED;   //TODO WHY IS THIS NOT UPDATING 
        
        
        
        //return 
    }

    function pseudoRandom() public view returns(uint8) {
        //return uint8(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        //msg.sender))[2] & 0x01);
        bytes32 b = keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender)); 
        return  uint8(b[0] & 0x01);
    }
 
    function getGamePlayers(uint _gid) gameExists(_gid) public view returns(address[2] memory) {
       // require(_gid < game_count, "_gid game not yet created");
        return  [game_instances[_gid].player1, game_instances[_gid].player2];//game_instances[_gid].game_grid;
    }
    function getGameGrid(uint _gid) gameExists(_gid) public view returns(uint8[] memory) {
       // require(_gid < game_count, "_gid game not yet created");
        return  game_instances[_gid].game_grid;
    }
    function getEndBlock(uint _gid) gameExists(_gid)  public view returns(uint256) {
        return  game_instances[_gid].end_block;
    }
    function getGridLength(uint _gid) gameExists(_gid) public view returns(uint256) {
        return game_instances[_gid].grid_length;
    }
    function getGameState(uint _gid) gameExists(_gid) public view returns(State) {
        return game_instances[_gid].state;
    }
    function getPlayerGames(address _addr) public view returns (uint[] memory) {
        return player_games[_addr];
    }
    function getGameCount() public view returns (uint256) {
        return game_count;
    }

    //for testing purposes
    function setRandomizer(uint _gid) public {
        game_instances[_gid].randomizer = bytes32(0);
    }
    function setRandomizerBWin(uint _gid) public {
        //game_instances[_gid].randomizer = bytes32('ffffffffffffffffffffffffffffffff');
        game_instances[_gid].randomizer = bytes32('________________________________');//game_instances[_gid].randomizer;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract BGCOL {  
    enum State { FRESH, WAITING, FINISHED}
    struct Game {
        uint8 rows;
        uint8 cols;
        uint256 grid_length;
        //uint8[] game_grid; 
        //bytes game_grid;
        string game_grid;
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

    function check_grid(bytes calldata _seed) private view { 
        for(uint i=0; i<bytes(_seed).length; ) {
            if(_seed[i]!="0" &&
                _seed[i]!="1" &&
                _seed[i]!="2") {
                    revert("_seed must contain only {1,2,3} values");
                } 
            unchecked{ i++;}
        }
    }
  

    function setGameArray2P(uint8 _rows, uint8 _cols, string calldata _seed, uint8 _duration, uint8 _iterations) public {
  
        require(_rows*_cols == bytes(_seed).length, "_rows and _cols dont match _seed");
        check_grid(bytes(_seed));
         
        //require(_grid_length < 15, "Max row length is 15"); TODO eventually see which is the biggest array we can handle with 60M Gas
        game_instances[game_count] = Game(
            _rows,
            _cols,
            _rows*_cols,
            //bytes(_seed),
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


    function runIterations(uint _gid) private view returns(string memory){ //returns(uint8[] memory) {  
        
        //      c   c    c
        //  r   NW  N   NE
        //  r   W  CELL  E
        //  r   SW  S   SE   

        Game memory game = game_instances[_gid];
        bytes memory game_grid = bytes(game.game_grid);   
        bytes memory _res_game_grid = bytes(game.game_grid); 

        bool isTopRow;
        bool isBottomRow;
        bool isLeftCol;
        bool isRightCol;

        uint8[] memory neighs = new uint8[](3);
 
        uint8 cell;  
        uint8 bottom_delimiter = (game.rows-1)*game.cols;
    
        uint8 top_delta;
        uint8 bottom_delta;

        uint8 diff;
        for(uint i=0; i<game.iterations; ) { 
            console.log("iteration: ", i);
            for(cell=0; cell<game.grid_length; ) {
                //console.log("cell: ", cell);
                neighs[0] = 0;
                neighs[1] = 0;
                neighs[2] = 0;

                isLeftCol = cell % game.cols == 0; 
                isRightCol = (cell+1) % game.cols == 0;
                
                
                if(cell >= game.cols) { //!isTopRow
                    top_delta = cell-game.cols;
                    // NW
                    if(!isLeftCol) {
                        if(game_grid[top_delta-1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[top_delta-1] == '2') {
                            neighs[2]++; 
                        }
                    } 
                    // N 
                    if(game_grid[top_delta] == '1') {
                        neighs[1]++;
                    } else if (game_grid[top_delta] == '2') {
                        neighs[2]++; 
                    }
                    // NE
                    if(!isRightCol) {
                        if(game_grid[top_delta+1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[top_delta+1] == '2') {
                            neighs[2]++; 
                        }
                    }

                }

                 if(cell < bottom_delimiter) { //!isTopRow
                    bottom_delta = cell+game.cols;
                    // SW
                    if(!isLeftCol) {
                        if(game_grid[bottom_delta-1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[bottom_delta-1] == '2') {
                            neighs[2]++; 
                        }
                    } 
                    // S 
                    if(game_grid[bottom_delta] == '1') {
                        neighs[1]++;
                    } else if (game_grid[bottom_delta] == '2') {
                        neighs[2]++; 
                    }
                    // SE
                    if(!isRightCol) {
                        if(game_grid[top_delta+1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[top_delta+1] == '2') {
                            neighs[2]++; 
                        }
                    }
 
                    // W
                    if(!isLeftCol){ 
                        if(game_grid[cell-1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[cell-1] == '2') {
                            neighs[2]++; 
                        }
                    } 
                    // E
                    if(!isRightCol) {
                        if(game_grid[cell+1] == '1') {
                            neighs[1]++;
                        } else if (game_grid[cell+1] == '2') {
                            neighs[2]++; 
                        }
                    }
                    
                    if(game_grid[cell]=='0') { //EMPTY
                        if(neighs[1] == 3) { //If has 3 wNei
                            if(neighs[2] == 3) { //AND 3 bNei
                                //choose randomly
                                //_res_game_grid[cell] = uint8(game.randomizer[(i+cell)%32] & 0x01)+1;
                                uint x;
                                console.log("tie boi");
                            } else {            //if bNei != 3 
                                _res_game_grid[cell] = '1';
                            }
                            } else if (neighs[2] == 3) { // if bNei is 3
                                _res_game_grid[cell] = '2'; 
                            }  
                    } else  {  
                        if(neighs[2] > neighs[1]) {
                            diff = neighs[2] - neighs[1];
                        } else {
                            diff = neighs[1] - neighs[2]; 
                        }
                        
                        if (game_grid[cell]=='1') { //WHITE 
                            if(diff == 1 && neighs[1] == 1) {
                                _res_game_grid[cell] = '0';  
                            }
                            else if(diff != 2 && diff != 3) {
                                _res_game_grid[cell] = '0'; 
                            }  
                        } else {        
                            if(diff == 1 && neighs[2] == 1) {
                                _res_game_grid[cell] = '0';  
                            }
                            else if(diff != 2 && diff != 3) {
                                _res_game_grid[cell] = '0'; 
                            }  
                        }
                    }

                }

                unchecked{cell++;}

            }
            unchecked{i++;}
        }
        //console.log(string(game_grid));
        //console.log(string(_res_game_grid));
        return string(game.game_grid);
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
    function getGameGrid(uint _gid) gameExists(_gid) public view returns(string memory) {
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

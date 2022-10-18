// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract LookUp { 
    function solve_cell(string memory setup) public view returns(bytes1) {}
}
// Uncomment this line to use console.log
import "hardhat/console.sol";
//TODO add betting logic
//TODO add commit-reveal for player1 seed
//TODO add logic to "add" a new pattern mid game
contract LUGOL {  
    enum State { FRESH, WAITING, FINISHED}
    LookUp lookUp;
    address lookUpTable;

    struct Game {
        uint256 rows;
        uint256 cols;
        uint256 grid_length; 
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

    constructor(address _lookUpTable) {
        lookUpTable = _lookUpTable;
        lookUp = LookUp(_lookUpTable);
    }

    function check_grid(bytes calldata _seed) private pure { 
        for(uint i=0; i<bytes(_seed).length; ) {
            if(_seed[i]!="0" &&
                _seed[i]!="1" &&
                _seed[i]!="2") {
                    revert("_seed must contain only {1,2,3} values");
                } 
            unchecked{ i++;}
        }
    }
  

    function setGameArray2P(uint256 _rows, uint256 _cols, string calldata _seed, uint256 _duration, uint256 _iterations) public {
  
        require(_rows*_cols == bytes(_seed).length, "_rows and _cols dont match _seed");
        check_grid(bytes(_seed));
         
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

    function getTopRowLayout(uint cell, bytes memory _game_grid, bool isLeftEdge, bool isRightEdge, uint bottom_delta) private pure returns(string memory layout) {
        if(isLeftEdge){
            layout = string(abi.encodePacked(_game_grid[cell],
                                            "0000", //top row +leftcol
                                            _game_grid[cell+1], //right col
                                            "0", //botom left col
                                            _game_grid[bottom_delta], //bottom col
                                            _game_grid[bottom_delta+1])); //bottomR col
        }
        else if(isRightEdge) { 
            layout = string(abi.encodePacked(_game_grid[cell],
                                            "000", //top row
                                            _game_grid[cell-1], //left col
                                            "0", //right col
                                            _game_grid[bottom_delta-1], //bottomL col
                                            _game_grid[bottom_delta], //bottom col
                                            "0")); //bottomR col
        }else{
            layout = string(abi.encodePacked(_game_grid[cell],
                                            "000", //top row
                                            _game_grid[cell-1], //left col
                                            _game_grid[cell+1], //right col
                                            _game_grid[bottom_delta-1], //bottomL col
                                            _game_grid[bottom_delta], //bottom col
                                            _game_grid[bottom_delta+1])); //bottomR col
        }
         
    } 
    function getBottomRowLayout(uint cell, bytes memory _game_grid, bool isLeftEdge, bool isRightEdge, uint top_delta) private pure returns(string memory layout) {
        if(isLeftEdge){
            layout = string(abi.encodePacked(_game_grid[cell],
                                            "0", //topL 
                                            _game_grid[top_delta],  //top
                                            _game_grid[top_delta+1], //topR
                                            "0",  //left
                                            _game_grid[cell+1], //right
                                            "000")); //bottom row 
        }else if(isRightEdge) {   
            layout = string(abi.encodePacked(_game_grid[cell],
                                            _game_grid[top_delta-1],
                                            _game_grid[top_delta], 
                                            "0",
                                            _game_grid[cell-1], 
                                            "0000")); //bottom row 
        }else{ 
            layout = string(abi.encodePacked(_game_grid[cell], 
                                            _game_grid[top_delta-1], //topL 
                                            _game_grid[top_delta],  //top
                                            _game_grid[top_delta+1], //topR
                                            _game_grid[cell-1],  //left
                                            _game_grid[cell+1],  //right
                                            "000")); 
        } 
    } 
    function getMidRowLayout(uint cell, bytes memory _game_grid, bool isLeftEdge, bool isRightEdge, uint top_delta, uint bottom_delta) private pure returns(string memory layout) {
        if(isLeftEdge){
            layout = string(abi.encodePacked(_game_grid[cell],
                                            "0", //topL
                                            _game_grid[top_delta],  //top
                                            _game_grid[top_delta+1], //topR
                                            "0", //left
                                            _game_grid[cell+1], //right
                                            "0",  //bottomL
                                            _game_grid[bottom_delta],  //bottom
                                            _game_grid[bottom_delta+1]));  //bottomR
        }else if(isRightEdge) {
            layout = string(abi.encodePacked(_game_grid[cell],
                                            _game_grid[top_delta-1],
                                            _game_grid[top_delta], 
                                            "0", // topR
                                            _game_grid[cell-1], //left
                                            "0",  // right
                                            _game_grid[bottom_delta-1], //bottomL 
                                            _game_grid[bottom_delta], //bottom
                                            "0")); //bottomR
        }else{
            layout = string(abi.encodePacked(_game_grid[cell],
                                            _game_grid[top_delta-1], //topL
                                            _game_grid[top_delta], //top
                                            _game_grid[top_delta+1], //topR
                                            _game_grid[cell-1], //left
                                            _game_grid[cell+1], //right
                                            _game_grid[bottom_delta-1], //bottomL  
                                            _game_grid[bottom_delta],  //bottom
                                            _game_grid[bottom_delta+1]));  //bottomR
        } 
    } 
 
    function runIterations(uint _gid) private view returns(string memory){ //returns(uint8[] memory) {  
        
        //      c   c    c
        //  r   NW  N   NE
        //  r   W  CELL  E
        //  r   SW  S   SE   

        Game memory game = game_instances[_gid];
        bytes memory game_grid = bytes(game_instances[_gid].game_grid);   
        bytes memory _res_game_grid;// = bytes(game_instances[_gid].game_grid); // = bytes(game_instances[_gid].game_grid); 
 
        bool isLeftEdge;
        bool isRightEdge;

        uint256 cell;  
        uint256 bottom_delimiter = (game.rows-1)*game.cols;
    
        uint256 top_delta;
        uint256 bottom_delta;
 
        string memory layout;
 
        for(uint i=0; i<game.iterations; ) {  
            _res_game_grid = new bytes(game.grid_length); 

            for(cell=0; cell<game.grid_length; ) { 
                isLeftEdge = cell % game.cols == 0; 
                isRightEdge = (cell+1) % game.cols == 0;

                if(cell < game.cols) {  //TOP ROW 
                    bottom_delta = cell+game.cols; 
                    layout = getTopRowLayout(cell,  game_grid, isLeftEdge, isRightEdge, bottom_delta);
                     
                } else if (cell >= bottom_delimiter) { //BOTTOM ROW
                    top_delta = cell-game.cols;
                    layout = getBottomRowLayout(cell, game_grid, isLeftEdge, isRightEdge, top_delta);
                     
                } else {
                    top_delta = cell-game.cols;
                    bottom_delta = cell+game.cols; 
                    layout = getMidRowLayout(cell,  game_grid, isLeftEdge, isRightEdge, top_delta, bottom_delta);
                     
                } 
                bytes1 res = lookUp.solve_cell(layout);  
                if (res == '3') { 
                    if(uint8(game.randomizer[(i+cell)%32] & 0x01) == 0) { 
                        _res_game_grid[cell] = '1';
                    } else {
                        _res_game_grid[cell] = '2'; 
                    }  
                } else {
                    _res_game_grid[cell] = res;
                }
                
                unchecked{cell++;}   
            } 
            game_grid = _res_game_grid;
            unchecked{i++;}
        }
        return string(game_grid);
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
        game_instances[_gid].state = State.FINISHED;   
        //return 
    }

    function pseudoRandom() public view returns(bytes1) {
        bytes32 b = keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender)); 
        return  bytes1(uint8(b[0] & 0x01)+1);
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

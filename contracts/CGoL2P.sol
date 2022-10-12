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
    enum State { WAITING, ONGOING, FINISHED}
    struct Game {
        uint8 rows;
        uint8 cols;
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
    }
 
    mapping(uint256 => Game) game_instances;
    mapping(address => uint256[]) player_games; 
    uint256 game_count; 

    function setGameArray2P(uint8 _rows, uint8 _cols, uint8[] memory _seed, uint8 _duration, uint8 _iterations) public {
        require(_rows*_cols == _seed.length, "_rows and _cols dont match _seed");
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
            State.WAITING,
            address(0)
        );
        player_games[msg.sender].push(game_count);
        game_count++;
    }




    function copyArray(bool[] memory arr) public pure returns (bool[] memory) {
        bool[] memory res = new bool[](arr.length);
        
        for(uint8 x=0; x<arr.length; ){
            res[x] = arr[x];
            unchecked {x++;}
        } 
        return res; 
    }

/*
    function runGameArrayBasic() public returns(bool[] memory _game_grid) {  
        
        //      r   r    r
        //  c   NW  N   NE
        //  c   W  CELL  E
        //  c   SW  S   SE
        

        _game_grid = game_grid;
        bool[] memory _res_game_grid = copyArray(_game_grid);
        uint8 num_alive_neighs;
        uint8 grid_size = grid_length * grid_length;
        bool isTopRow;
        bool isBottomRow;
        bool isLeftEdge;
        bool isRightEdge;
 
        for(uint i=0; i<instance.duration; ) {   
            for(uint c=0; c < instance.grid_size; ) { 
                num_alive_neighs = 0; 
                isTopRow = c < instance.grid_length;
                isBottomRow = c >= instance.grid_length*(instance.grid_length-1);
                isLeftEdge = c % instance.grid_length == 0;
                isRightEdge = (c +1) % instance.grid_length == 0; 
                // NW
                if(!isTopRow && !isLeftEdge && _game_grid[c-instance.grid_length-1]) {
                    num_alive_neighs++;
                }
                // N
                if(!isTopRow && _game_grid[c-instance.grid_length]) {
                    num_alive_neighs++; 
                }
                // NE
                if(!isTopRow && !isRightEdge && _game_grid[c-instance.grid_length+1]) {
                    num_alive_neighs++; 
                } 
                // W
                if(!isLeftEdge && instance._game_grid[c-1]) {
                    num_alive_neighs++; 
                } 
                // E
                if(!isRightEdge && instance._game_grid[c+1]) {
                    num_alive_neighs++; 
                } 
                // SW
                if(!isBottomRow && !isLeftEdge  && instance._game_grid[c+instance.grid_length-1]) {
                    num_alive_neighs++; 
                }
                // S
                if(!isBottomRow && instance._game_grid[c+instance.grid_length]) {
                    num_alive_neighs++; 
                }
                // SE
                if(!isBottomRow && !isRightEdge && instance._game_grid[c+instance.grid_length+1]) {
                    num_alive_neighs++; 
                }   
                if (instance._game_grid[c]) { 
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
        instance.winner = msg.sender;
        return _game_grid;
    } 
*/

    modifier gameExists(uint _gid) {
        require(_gid < game_count, "_gid game not yet created");
        _;
    }
 
    function joinGame(uint _gid) gameExists(_gid) public {
        require(game_instances[_gid].state == State.WAITING, "game must be in WAITING");
        require(game_instances[_gid].player1 !=  msg.sender, "owner cant join his own game");
        game_instances[_gid].state = State.ONGOING;
        game_instances[_gid].player2 = msg.sender; 

        player_games[msg.sender].push(_gid);

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
    function getGameCount() public view returns (uint256) {
        return game_count;
    }
    function getGameState(uint _gid) gameExists(_gid) public view returns(State) {
        return game_instances[_gid].state;
    }
    function getPlayerGames(address _addr) public view returns (uint[] memory) {
        return player_games[_addr];
    }
}
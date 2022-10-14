export const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "arr",
          "type": "uint8[]"
        }
      ],
      "name": "copyArray",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "executeGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "getEndBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getGameCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "getGameGrid",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "getGamePlayers",
      "outputs": [
        {
          "internalType": "address[2]",
          "name": "",
          "type": "address[2]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "getGameState",
      "outputs": [
        {
          "internalType": "enum GCOL2P.State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "getGridLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "getPlayerGames",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gid",
          "type": "uint256"
        }
      ],
      "name": "joinGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_rows",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_cols",
          "type": "uint8"
        },
        {
          "internalType": "uint8[]",
          "name": "_seed",
          "type": "uint8[]"
        },
        {
          "internalType": "uint8",
          "name": "_duration",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_iterations",
          "type": "uint8"
        }
      ],
      "name": "setGameArray2P",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export function getAbiForOctane()
{
    var abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "idReservation",
            "type": "uint16"
          }
        ],
        "name": "cancelReservation",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "hour",
            "type": "uint8"
          }
        ],
        "name": "createReservation",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBalance",
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
        "name": "getBalanceOwner",
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
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          }
        ],
        "name": "getDayReservations",
        "outputs": [
          {
            "internalType": "uint16[]",
            "name": "",
            "type": "uint16[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "idReservation",
            "type": "uint16"
          }
        ],
        "name": "getReservation",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "components": [
                  {
                    "internalType": "uint16",
                    "name": "year",
                    "type": "uint16"
                  },
                  {
                    "internalType": "uint8",
                    "name": "month",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint8",
                    "name": "day",
                    "type": "uint8"
                  },
                  {
                    "internalType": "uint8",
                    "name": "hour",
                    "type": "uint8"
                  }
                ],
                "internalType": "struct Octane.Schedule",
                "name": "schedule",
                "type": "tuple"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint8",
                "name": "discount",
                "type": "uint8"
              },
              {
                "internalType": "enum Octane.State",
                "name": "state",
                "type": "uint8"
              }
            ],
            "internalType": "struct Octane.Reservation",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getReservationPerUser",
        "outputs": [
          {
            "internalType": "uint16[]",
            "name": "",
            "type": "uint16[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hourValue",
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
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "hour",
            "type": "uint8"
          }
        ],
        "name": "isFree",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "year",
            "type": "uint16"
          },
          {
            "internalType": "uint8",
            "name": "month",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "day",
            "type": "uint8"
          }
        ],
        "name": "listReservationPerDay",
        "outputs": [
          {
            "internalType": "bool[]",
            "name": "",
            "type": "bool[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "maximumHour",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "minimumHour",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_hourValue",
            "type": "uint256"
          }
        ],
        "name": "setHourValue",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "_maximumHour",
            "type": "uint8"
          }
        ],
        "name": "setMaximumHour",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "_minimumHour",
            "type": "uint8"
          }
        ],
        "name": "setMinimumHour",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawPerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    return abi;
}

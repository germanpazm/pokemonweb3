  const abi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "habilidad",
				"type": "string"
			}
		],
		"name": "NewPokemon",
		"type": "event"
	},
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
				"internalType": "uint256",
				"name": "IdPokemon",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "precioVenta",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "antiguoPropietario",
				"type": "address"
			}
		],
		"name": "Transferir",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ataque",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defensa",
				"type": "uint256"
			}
		],
		"name": "anadirpokemon",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserTransactionHashes",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
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
				"internalType": "bytes32",
				"name": "_transactionHash",
				"type": "bytes32"
			}
		],
		"name": "logTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "obtenerPokemon",
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
		"inputs": [],
		"name": "obtenerPokemonEnVenta",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pokemon",
		"outputs": [
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ataque",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defensa",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nivel",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pokemon_propietario",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pokemon_propietariovender",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pokemonvender",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "precioventa",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "actualpropietario",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "pokemonNombre",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ataque",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defensa",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nivel",
				"type": "uint256"
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
				"name": "_precioCompra",
				"type": "uint256"
			}
		],
		"name": "setprecioCompra",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_precioNivel",
				"type": "uint256"
			}
		],
		"name": "setprecioNivel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pokemonId",
				"type": "uint256"
			}
		],
		"name": "subirNivel",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "IdPokemon",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "precioVenta",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "pokemonNombre",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ataque",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defensa",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nivel",
				"type": "uint256"
			}
		],
		"name": "vender",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
    let contrato='0xCC74b186125119c5A1934E091D78eeCc729A1d52';
    let web3js = new Web3(window.ethereum);
    const web=new web3js.eth.Contract(abi,contrato);

    export {abi,contrato,web3js,web}	
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { CryptoFetcher } from "../CryptoFetcher";

export class CryptoFetcher__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CryptoFetcher> {
    return super.deploy(overrides || {}) as Promise<CryptoFetcher>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CryptoFetcher {
    return super.attach(address) as CryptoFetcher;
  }
  connect(signer: Signer): CryptoFetcher__factory {
    return super.connect(signer) as CryptoFetcher__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CryptoFetcher {
    return new Contract(address, _abi, signerOrProvider) as CryptoFetcher;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketFactory",
        type: "address",
      },
      {
        internalType: "contract AMMFactory",
        name: "_ammFactory",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
    ],
    name: "fetchDynamic",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "contract AbstractMarketFactoryV3",
                name: "factory",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "marketId",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "uint256[]",
                    name: "tokenRatios",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "balances",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "weights",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256",
                    name: "swapFee",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "totalSupply",
                    type: "uint256",
                  },
                ],
                internalType: "struct Fetcher.PoolBundle",
                name: "pool",
                type: "tuple",
              },
              {
                internalType: "contract OwnedERC20",
                name: "winner",
                type: "address",
              },
            ],
            internalType: "struct Fetcher.DynamicMarketBundle",
            name: "super",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "resolutionPrice",
            type: "uint256",
          },
        ],
        internalType: "struct CryptoFetcher.SpecificDynamicMarketBundle[]",
        name: "_bundles",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_lowestMarketIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketFactory",
        type: "address",
      },
      {
        internalType: "contract AMMFactory",
        name: "_ammFactory",
        type: "address",
      },
      {
        internalType: "contract MasterChef",
        name: "_masterChef",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
    ],
    name: "fetchInitial",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "shareFactor",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "stakerFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "settlementFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "protocolFee",
                type: "uint256",
              },
              {
                internalType: "contract FeePot",
                name: "feePot",
                type: "address",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "symbol",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "decimals",
                    type: "uint256",
                  },
                ],
                internalType: "struct Fetcher.CollateralBundle",
                name: "collateral",
                type: "tuple",
              },
              {
                internalType: "uint256",
                name: "marketCount",
                type: "uint256",
              },
            ],
            internalType: "struct Fetcher.MarketFactoryBundle",
            name: "super",
            type: "tuple",
          },
        ],
        internalType: "struct CryptoFetcher.SpecificMarketFactoryBundle",
        name: "_marketFactoryBundle",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "contract AbstractMarketFactoryV3",
                name: "factory",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "marketId",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "uint256[]",
                    name: "tokenRatios",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "balances",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "weights",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256",
                    name: "swapFee",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "totalSupply",
                    type: "uint256",
                  },
                ],
                internalType: "struct Fetcher.PoolBundle",
                name: "pool",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "beginTimestamp",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "endTimestamp",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "earlyDepositEndTimestamp",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "totalRewardsAccrued",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "created",
                    type: "bool",
                  },
                ],
                internalType: "struct MasterChef.PoolStatusInfo",
                name: "rewards",
                type: "tuple",
              },
              {
                internalType: "contract OwnedERC20[]",
                name: "shareTokens",
                type: "address[]",
              },
              {
                internalType: "uint256",
                name: "creationTimestamp",
                type: "uint256",
              },
              {
                internalType: "contract OwnedERC20",
                name: "winner",
                type: "address",
              },
              {
                internalType: "uint256[]",
                name: "initialOdds",
                type: "uint256[]",
              },
            ],
            internalType: "struct Fetcher.StaticMarketBundle",
            name: "super",
            type: "tuple",
          },
          {
            internalType: "uint8",
            name: "marketType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "coinIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creationPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "resolutionTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "resolutionPrice",
            type: "uint256",
          },
        ],
        internalType: "struct CryptoFetcher.SpecificStaticMarketBundle[]",
        name: "_marketBundles",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_lowestMarketIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252600681526543727970746f60d01b60208083019182528351808501909452600384526215109160ea1b9084015281519192916200005b916000916200007a565b508051620000719060019060208401906200007a565b50505062000126565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620000b25760008555620000fd565b82601f10620000cd57805160ff1916838001178555620000fd565b82800160010185558215620000fd579182015b82811115620000fd578251825591602001919060010190620000e0565b506200010b9291506200010f565b5090565b5b808211156200010b576000815560010162000110565b611cef80620001366000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806322254b88146100515780632dd489091461007d57806354fd4d501461009257806356d274911461009a575b600080fd5b61006461005f366004611421565b6100bc565b6040516100749493929190611b67565b60405180910390f35b610085610197565b6040516100749190611b54565b610085610225565b6100ad6100a836600461147b565b61027f565b60405161007493929190611a62565b6100c461115e565b60606000806100d289610344565b935060606100e18a888861035c565b81519750935090508567ffffffffffffffff8111801561010057600080fd5b5060405190808252806020026020018201604052801561013a57816020015b610127611176565b81526020019060019003908161011f5790505b50935060005b86811015610186576101678b8b8b85858151811061015a57fe5b60200260200101516104b7565b85828151811061017357fe5b6020908102919091010152600101610140565b504291505095509550955095915050565b6000805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561021d5780601f106101f25761010080835404028352916020019161021d565b820191906000526020600020905b81548152906001019060200180831161020057829003601f168201915b505050505081565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561021d5780601f106101f25761010080835404028352916020019161021d565b6060600080606061029188878761035c565b81519650935090508467ffffffffffffffff811180156102b057600080fd5b506040519080825280602002602001820160405280156102ea57816020015b6102d76111b5565b8152602001906001900390816102cf5790505b50935060005b8581101561033557610316898984848151811061030957fe5b6020026020010151610595565b85828151811061032257fe5b60209081029190910101526001016102f0565b50429150509450945094915050565b61034c61115e565b6103558261063b565b8152919050565b606060008267ffffffffffffffff8111801561037757600080fd5b506040519080825280602002602001820160405280156103a1578160200160208202803683370190505b50915060006001866001600160a01b031663ec9790826040518163ffffffff1660e01b815260040160206040518083038186803b1580156103e157600080fd5b505afa1580156103f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610419919061178d565b0390508015806104295750808510155b156104475750506040805160008082526020820190925291506104af565b600085820392505b61045987846109b5565b1561047a578284828151811061046b57fe5b60209081029190910101526001015b848110610486576104a0565b8260011415610494576104a0565b6000199092019161044f565b808511156104ac578084525b50505b935093915050565b6104bf611176565b60405163b06c1ba360e01b81526000906001600160a01b0387169063b06c1ba3906104ee908690600401611c26565b60a06040518083038186803b15801561050657600080fd5b505afa15801561051a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053e91906115a1565b905061054c86868686610ad9565b82528051801561055857fe5b60ff16602080840191909152604080830151606080860191909152918301519084015281015160a083015260809081015190820152949350505050565b61059d6111b5565b60405163b06c1ba360e01b81526000906001600160a01b0386169063b06c1ba3906105cc908690600401611c26565b60a06040518083038186803b1580156105e457600080fd5b505afa1580156105f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061c91906115a1565b9050610629858585610c4b565b82526060015160208201529392505050565b6106436111d5565b816001600160a01b0316637641ab016040518163ffffffff1660e01b815260040160206040518083038186803b15801561067c57600080fd5b505afa158015610690573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b4919061178d565b816000018181525050816001600160a01b0316634b2d9ffc6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106f657600080fd5b505afa15801561070a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072e919061178d565b816020018181525050816001600160a01b0316637d1d7fb86040518163ffffffff1660e01b815260040160206040518083038186803b15801561077057600080fd5b505afa158015610784573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a8919061178d565b816040018181525050816001600160a01b031663b0e21e8a6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107ea57600080fd5b505afa1580156107fe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610822919061178d565b816060018181525050816001600160a01b0316634c9f66c76040518163ffffffff1660e01b815260040160206040518083038186803b15801561086457600080fd5b505afa158015610878573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089c91906114fb565b81608001906001600160a01b031690816001600160a01b031681525050610932826001600160a01b031663d8dfeb456040518163ffffffff1660e01b815260040160206040518083038186803b1580156108f557600080fd5b505afa158015610909573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092d91906114fb565b610d0f565b8160a00181905250816001600160a01b031663ec9790826040518163ffffffff1660e01b815260040160206040518083038186803b15801561097357600080fd5b505afa158015610987573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ab919061178d565b60c0820152919050565b600080836001600160a01b031663eb44fdd3846040518263ffffffff1660e01b81526004016109e49190611c26565b60006040518083038186803b1580156109fc57600080fd5b505afa158015610a10573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a389190810190611616565b60408101519091506001600160a01b0316610a57576001915050610ad3565b600081604001516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a9657600080fd5b505afa158015610aaa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ace919061178d565b119150505b92915050565b610ae1611214565b60405163eb44fdd360e01b81526000906001600160a01b0387169063eb44fdd390610b10908690600401611c26565b60006040518083038186803b158015610b2857600080fd5b505afa158015610b3c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b649190810190611616565b6001600160a01b0387168352602083018490529050610b84868685610e1c565b604080840191909152516327def0cb60e21b81526001600160a01b03851690639f7bc32c90610bbb9088908a908890600401611b17565b60a06040518083038186803b158015610bd357600080fd5b505afa158015610be7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0b9190611720565b60608301526020810151608083015260e08082015160a084015260408201516001600160a01b031660c08401526101209091015190820152949350505050565b610c5361126c565b60405163eb44fdd360e01b81526000906001600160a01b0386169063eb44fdd390610c82908690600401611c26565b60006040518083038186803b158015610c9a57600080fd5b505afa158015610cae573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610cd69190810190611616565b6001600160a01b0380871684526020840185905260408201511660608401529050610d02858585610e1c565b6040830152509392505050565b610d17611298565b6001600160a01b038216808252604080516395d89b4160e01b815290516395d89b4191600480820192600092909190829003018186803b158015610d5a57600080fd5b505afa158015610d6e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d969190810190611517565b8160200181905250816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610dd757600080fd5b505afa158015610deb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0f91906117a5565b60ff166040820152919050565b610e246112c2565b604051632dadcf5160e11b81526000906001600160a01b03851690635b5b9ea290610e559088908790600401611b3b565b60206040518083038186803b158015610e6d57600080fd5b505afa158015610e81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea591906114fb565b90506001600160a01b038116610ebb5750611157565b6001600160a01b038116808352604080516318160ddd60e01b815290516318160ddd91600480820192602092909190829003018186803b158015610efe57600080fd5b505afa158015610f12573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f36919061178d565b60a083015260405163fa0de35960e01b81526001600160a01b0385169063fa0de35990610f699088908790600401611b3b565b60206040518083038186803b158015610f8157600080fd5b505afa158015610f95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb9919061178d565b608083015260405163d2364bf360e01b81526001600160a01b0385169063d2364bf390610fec9088908790600401611b3b565b60006040518083038186803b15801561100457600080fd5b505afa158015611018573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261104091908101906114c0565b6040808401919091525163c7b4b6dd60e01b81526001600160a01b0385169063c7b4b6dd906110759088908790600401611b3b565b60006040518083038186803b15801561108d57600080fd5b505afa1580156110a1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110c991908101906114c0565b602083015260405163d055da7160e01b81526001600160a01b0385169063d055da71906110fc9088908790600401611b3b565b60006040518083038186803b15801561111457600080fd5b505afa158015611128573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261115091908101906114c0565b6060830152505b9392505050565b60405180602001604052806111716111d5565b905290565b6040518060c00160405280611189611214565b8152602001600060ff168152602001600081526020016000815260200160008152602001600081525090565b60405180604001604052806111c861126c565b8152602001600081525090565b6040518060e001604052806000815260200160008152602001600081526020016000815260200160006001600160a01b031681526020016111c8611298565b6040805161010081018252600080825260208201529081016112346112c2565b8152602001611241611301565b8152602001606081526020016000815260200160006001600160a01b03168152602001606081525090565b604080516080810182526000808252602082015290810161128b6112c2565b8152600060209091015290565b604051806060016040528060006001600160a01b0316815260200160608152602001600081525090565b6040518060c0016040528060006001600160a01b0316815260200160608152602001606081526020016060815260200160008152602001600081525090565b6040518060a00160405280600081526020016000815260200160008152602001600081526020016000151581525090565b805161133d81611ca1565b919050565b600082601f830112611352578081fd5b8151602061136761136283611c53565b611c2f565b8281528181019085830183850287018401881015611383578586fd5b855b858110156113aa57815161139881611ca1565b84529284019290840190600101611385565b5090979650505050505050565b600082601f8301126113c7578081fd5b815160206113d761136283611c53565b82815281810190858301838502870184018810156113f3578586fd5b855b858110156113aa578151845292840192908401906001016113f5565b8051801515811461133d57600080fd5b600080600080600060a08688031215611438578081fd5b853561144381611ca1565b9450602086013561145381611ca1565b9350604086013561146381611ca1565b94979396509394606081013594506080013592915050565b60008060008060808587031215611490578182fd5b843561149b81611ca1565b935060208501356114ab81611ca1565b93969395505050506040820135916060013590565b6000602082840312156114d1578081fd5b815167ffffffffffffffff8111156114e7578182fd5b6114f3848285016113b7565b949350505050565b60006020828403121561150c578081fd5b815161115781611ca1565b600060208284031215611528578081fd5b815167ffffffffffffffff8082111561153f578283fd5b818401915084601f830112611552578283fd5b81518181111561155e57fe5b611571601f8201601f1916602001611c2f565b9150808252856020828501011115611587578384fd5b611598816020840160208601611c71565b50949350505050565b600060a082840312156115b2578081fd5b60405160a0810181811067ffffffffffffffff821117156115cf57fe5b6040528251600181106115e0578283fd5b80825250602083015160208201526040830151604082015260608301516060820152608083015160808201528091505092915050565b600060208284031215611627578081fd5b815167ffffffffffffffff8082111561163e578283fd5b8184019150610160808387031215611654578384fd5b61165d81611c2f565b905061166883611332565b815260208301518281111561167b578485fd5b61168787828601611342565b60208301525061169960408401611332565b6040820152606083015160608201526080830151608082015260a083015160a082015260c083015160c082015260e083015160e082015261010080840151818301525061012080840151838111156116ef578586fd5b6116fb888287016113b7565b8284015250506101409150611711828401611411565b91810191909152949350505050565b600060a08284031215611731578081fd5b60405160a0810181811067ffffffffffffffff8211171561174e57fe5b80604052508251815260208301516020820152604083015160408201526060830151606082015261178160808401611411565b60808201529392505050565b60006020828403121561179e578081fd5b5051919050565b6000602082840312156117b6578081fd5b815160ff81168114611157578182fd5b6000815180845260208085019450808401835b838110156117fe5781516001600160a01b0316875295820195908201906001016117d9565b509495945050505050565b6000815180845260208085018081965082840281019150828601855b85811015611939578284038952815160c081518187526118488288018251611975565b8781015160e081818a015260409150818301516101806101008b01526118726102408b01826119ae565b90506060808501516118886101208d0182611a29565b5060808086015160bf19808e8603016101c08f01526118a785836117c6565b945060a09150818801516101e08f01528888015198506118cb6102008f018a611975565b858801519850808e8603016102208f0152506118e78489611946565b97508d89015196506118fb8e8e0188611a5b565b88860151958d019590955281880151918c019190915280870151908b0152505092830151929096019190915298850198935090840190600101611825565b5091979650505050505050565b6000815180845260208085019450808401835b838110156117fe57815187529582019590820190600101611959565b6001600160a01b03169052565b6000815180845261199a816020860160208601611c71565b601f01601f19169290920160200192915050565b600060018060a01b038251168352602082015160c060208501526119d560c0850182611946565b9050604083015184820360408601526119ee8282611946565b91505060608301518482036060860152611a088282611946565b9150506080830151608085015260a083015160a08501528091505092915050565b805182526020810151602083015260408101516040830152606081015160608301526080810151151560808301525050565b60ff169052565b606080825284518282018190526000919060809081850190602080820287018401818b01875b84811015611afb57898303607f1901865281518051604080865281516001600160a01b0390811682880152878301518c880152908201518a87018b90529190611ad460c08801846119ae565b918c01511660a0870152918601519486019490945295840195925090830190600101611a88565b5050908701989098525050505060409091019190915250919050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6000602082526111576020830184611982565b600060808252855160206080840152805160a0840152602081015160c0840152604081015160e08401526060810151610100840152608081015160018060a01b0380821661012086015260a0830151915060e06101408601528082511661018086015250602081015160606101a0860152611be66101e0860182611982565b905060408201516101c086015260c08301516101608601528481036020860152611c108189611809565b6040860197909752505050506060015292915050565b90815260200190565b60405181810167ffffffffffffffff81118282101715611c4b57fe5b604052919050565b600067ffffffffffffffff821115611c6757fe5b5060209081020190565b60005b83811015611c8c578181015183820152602001611c74565b83811115611c9b576000848401525b50505050565b6001600160a01b0381168114611cb657600080fd5b5056fea26469706673582212206e5cf12d02fb51fb7157950a2f4ce3ab86d33ad8e353f889b512b34050c25b6764736f6c63430007060033";

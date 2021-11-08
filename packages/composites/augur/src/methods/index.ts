import { ethers } from 'ethers'
import {
  CryptoCurrencyMarketFactoryV3,
  CryptoCurrencyMarketFactoryV3__factory,
  MLBMarketFactoryV3,
  MLBMarketFactoryV3__factory,
  MMAMarketFactoryV3,
  MMAMarketFactoryV3__factory,
  NBAMarketFactoryV3,
  NBAMarketFactoryV3__factory,
  NFLMarketFactoryV3,
  NFLMarketFactoryV3__factory,
} from '../typechain'

export * as resolveMarkets from './resolveMarkets'
export * as createMarkets from './createMarkets'
export * as pokeMarkets from './pokeMarkets'

export const TEAM_SPORTS = ['mlb', 'nba', 'nfl', 'ncaa-fb']
export const FIGHTER_SPORTS = ['mma']

export const CONTRACT_IDENTIFIERS = ['nfl', 'nba', 'mlb', 'mma', 'crypto'] as const

export type ContractIdentifier = typeof CONTRACT_IDENTIFIERS[number]

export function isContractIdentifier(s: string): s is ContractIdentifier {
  return CONTRACT_IDENTIFIERS.includes(s as ContractIdentifier)
}

export function getContract(
  identifier: ContractIdentifier,
  address: string,
  signer: ethers.Signer,
) {
  if (identifier === 'nfl') return NFLMarketFactoryV3__factory.connect(address, signer)
  if (identifier === 'nba') return NBAMarketFactoryV3__factory.connect(address, signer)
  if (identifier === 'mlb') return MLBMarketFactoryV3__factory.connect(address, signer)
  if (identifier === 'mma') return MMAMarketFactoryV3__factory.connect(address, signer)
  if (identifier === 'crypto')
    return CryptoCurrencyMarketFactoryV3__factory.connect(address, signer)
  else throw Error(`Unsupported identifier ${identifier}`)
}

export function isNFL(
  _contract: ethers.Contract,
  identifier: string,
): _contract is NFLMarketFactoryV3 {
  return identifier === 'nfl'
}

export function isNBA(
  _contract: ethers.Contract,
  identifier: string,
): _contract is NBAMarketFactoryV3 {
  return identifier === 'nba'
}

export function isMLB(
  _contract: ethers.Contract,
  identifier: string,
): _contract is MLBMarketFactoryV3 {
  return identifier === 'mlb'
}

export function isMMA(
  _contract: ethers.Contract,
  identifier: string,
): _contract is MMAMarketFactoryV3 {
  return identifier === 'mma'
}

export function isCrypto(
  _contract: ethers.Contract,
  identifier: ContractIdentifier,
): _contract is CryptoCurrencyMarketFactoryV3 {
  return identifier === 'crypto'
}

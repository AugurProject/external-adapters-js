import { Logger, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AdapterRequest, AdapterResponse, AdapterContext } from '@chainlink/types'
import { BigNumber, BigNumberish, Signer } from 'ethers'
import { DateTime } from 'luxon'

import { Config } from '../config'
import { getContract } from './index'
import { AggregatorV3Interface__factory, CryptoCurrencyMarketFactoryV3 } from '../typechain'

const pokeParams = {
  contractAddress: true,
}

export async function execute(
  input: AdapterRequest,
  _context: AdapterContext,
  config: Config,
): Promise<AdapterResponse> {
  const validator = new Validator(input, pokeParams)
  if (validator.error) throw validator.error

  const jobRunID = input.id

  const contract = getContract(
    'crypto',
    validator.validated.data.contractAddress,
    config.signer,
  ) as CryptoCurrencyMarketFactoryV3

  const pokeArgs = await buildPokeArgs(contract, config.signer)
  await pokeMarkets(config.signer, contract, pokeArgs)

  return Requester.success(jobRunID, {})
}

type PokeArgs = {
  coinIndex: BigNumberish
  nextResolutionTime: BigNumberish
  roundId: BigNumber
}

async function buildPokeArgs(
  contract: CryptoCurrencyMarketFactoryV3,
  signer: Signer,
): Promise<PokeArgs[]> {
  const args: PokeArgs[] = []
  const coins: Coin[] = (await contract.getCoins()).slice(1)
  for (let i = 0; i < coins.length; i++) {
    const coinIndex = i + 1
    const coin = coins[i]
    const { resolutionTime } = await contract.getMarketDetails(coin.currentMarket)
    const nextResolutionTime = await getNextResolutionTime(resolutionTime)
    if (nextResolutionTime !== null) {
      const roundId = await fetchResolutionRoundId(signer, coin, resolutionTime)
      if (roundId !== null) {
        args.push({ coinIndex, nextResolutionTime, roundId })
      }
    }
  }

  return args
}

async function pokeMarkets(
  signer: Signer,
  contract: CryptoCurrencyMarketFactoryV3,
  args: PokeArgs[],
) {
  Logger.debug(`Augur: Prepared to create ${args.length} markets`)

  let failed = 0
  let succeeded = 0

  let nonce = await signer.getTransactionCount()
  for (const arg of args) {
    try {
      const tx = await contract.pokeCoin(arg.coinIndex, arg.nextResolutionTime, arg.roundId, {
        nonce,
      })
      Logger.debug(`Created tx: ${tx.hash}`)
      nonce++
      succeeded++
    } catch (e) {
      failed++
      Logger.error(e)
    }
  }

  Logger.debug(`Augur: ${succeeded} created markets`)
  Logger.debug(`Augur: ${failed} markets failed to create`)
}

async function getNextResolutionTime(resolutionTime: BigNumber): Promise<number | null> {
  const now = Math.floor(DateTime.now().setZone('America/New_York').toSeconds())
  if (resolutionTime.gt(now)) {
    Logger.warn(`Augur: Next resolution time ${resolutionTime.toString()} is in the future`)

    return null
  }

  return getUpcomingFriday4pmET()
}

export interface Coin {
  name: string
  feed: string
  currentMarket: BigNumber
}

interface RoundData {
  roundId: BigNumber
  startedAt: BigNumber
  updatedAt: BigNumber
}

async function fetchResolutionRoundId(
  signer: Signer,
  coin: Coin,
  resolutionTime: BigNumber,
): Promise<BigNumber | null> {
  const aggregator = AggregatorV3Interface__factory.connect(coin.feed, signer)

  // Here we are going to walk backward through rounds to make sure that
  // we pick the *first* update after the passed-in resolutionTime
  let roundData: RoundData = await aggregator.latestRoundData()
  let round = RoundManagement.decode(roundData.roundId)
  // resolution time = 0 => return last round;
  if (resolutionTime.eq(0)) {
    return round.id
  }

  if (roundData.updatedAt.lt(resolutionTime)) {
    Logger.warn(
      `Augur: cryptoMarkets - oracle update for ${coin.name} hasn't occured yet. Its resolution time is ${resolutionTime} but oracle was updated at ${roundData.updatedAt}`,
    )
    return null
  }

  while (roundData.updatedAt.gte(resolutionTime)) {
    roundData = await aggregator.getRoundData(round.prevRound().id)
    round = round.prevRound()
  }

  // next round because we iterated one past the desired round
  round = round.nextRound()

  return round.id
}

export class RoundManagement {
  readonly phase: BigNumber
  readonly justRound: BigNumber

  constructor(phase: BigNumberish, justRound: BigNumberish) {
    this.phase = BigNumber.from(phase)
    this.justRound = BigNumber.from(justRound)
  }

  public get id(): BigNumber {
    return this.phase.shl(64).or(this.justRound)
  }

  public nextRound(): RoundManagement {
    return new RoundManagement(this.phase, this.justRound.add(1))
  }

  public prevRound(): RoundManagement {
    return new RoundManagement(this.phase, this.justRound.sub(1))
  }

  static decode(roundId: BigNumberish): RoundManagement {
    roundId = BigNumber.from(roundId)
    const phase = roundId.shr(64)
    const justRoundId = roundId.sub(phase.shl(64))
    return new RoundManagement(phase, justRoundId)
  }
}

export function getUpcomingFriday4pmET(): number {
  const nowEastern = DateTime.now().setZone('America/New_York')
  const thisWeek = nowEastern.set({ weekday: 5, hour: 16, minute: 0, second: 0, millisecond: 0 })
  const past = thisWeek.diff(nowEastern).milliseconds < 0
  const when = past ? thisWeek.plus({ week: 1 }) : thisWeek
  return Math.floor(when.toSeconds())
}

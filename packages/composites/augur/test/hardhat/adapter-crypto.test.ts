import { Logger, Requester } from '@chainlink/ea-bootstrap'
import { BigNumber } from 'ethers'
import { AdapterResponse } from '@chainlink/types'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { expect, spy } from './chai-setup'
import { execute } from '../../src/adapter'
import { CryptoCurrencyMarketFactoryV3 } from '../../src/typechain'
import { RoundManagement, Coin } from '../../src/methods/pokeMarkets'
import { DateTime, Settings } from 'luxon'

describe('Augur Crypto Adapter', () => {
  let poke: (contractAddress: string) => Promise<AdapterResponse>
  before('poke', async () => {
    const { deployer } = await getNamedAccounts()
    const signer = await ethers.getSigner(deployer)

    const config = {
      ...Requester.getDefaultConfig(''),
      verbose: true,
      signer,
    }

    poke = (contractAddress: string) => {
      return execute(
        {
          id: '1',
          data: {
            method: 'poke',
            contractAddress,
          },
        },
        {},
        config,
      )
    }
  })

  beforeEach('fixtures', async () => {
    await deployments.fixture(['SetPriceFeeds', 'ConfigureCryptoMarketFactory'])
  })

  describe('add initial round', async () => {
    let factory: CryptoCurrencyMarketFactoryV3
    let coinCount: number
    beforeEach('factories', async () => {
      factory = (await ethers.getContract(
        'CryptoCurrencyMarketFactoryV3',
      )) as CryptoCurrencyMarketFactoryV3
      const coins = (await factory.getCoins()).slice(1)
      coinCount = coins.length
      // mock luxon datetime
      Settings.now = () => new Date('August 1, 2021').valueOf()
    })

    beforeEach(() => spy.on(Logger, ['warn']))
    afterEach(() => spy.restore())

    beforeEach(async () => addRounds(factory, 1))

    beforeEach('initial poke', () => poke(factory.address))

    const nextResolutionTime = DateTime.fromObject({
      year: 2021,
      month: 8,
      day: 6,
      hour: 16,
      zone: 'America/New_York',
    })

    it('coin count is correct', () => expect(coinCount).to.equal(6))
    it('resolution time is correct', async () => {
      const coin: Coin = await factory.getCoin(1)
      const market = await factory.getMarketDetails(coin.currentMarket)
      expect(market.resolutionTime).to.equal(BigNumber.from(nextResolutionTime.toSeconds()))
    })
    it('one market per coin', async () =>
      expect(await factory.marketCount()).to.equal(1 + coinCount))

    describe('poke before resolution time passes', () => {
      beforeEach('early poke', () => poke(factory.address))
      it('one market per coin', async () =>
        expect(await factory.marketCount()).to.equal(1 + coinCount))
      it('warning emitted', () => {
        const time = nextResolutionTime.toSeconds().toString()
        const msg = `Augur: Next resolution time ${time} is in the future`
        expect(Logger.warn).to.have.been.called.always.with(msg)
        expect(Logger.warn).to.have.been.called.exactly(coinCount)
      })
    })

    describe('progressing through rounds', function () {
      this.timeout(0)
      beforeEach(async () => {
        // Set up initial markets from the round set up in the beforeEach
        await poke(factory.address)
      })

      it('cannot yet resolve rounds after 5 days', async () => {
        const roundUpdatedAt = await addRounds(factory, 5, 1)
        const now = roundUpdatedAt.plus({ minutes: 15 }).toMillis()
        spy.on(Settings, 'now', () => now)
        await poke(factory.address)
        const time = nextResolutionTime.toSeconds().toString()
        const msg = `Augur: Next resolution time ${time} is in the future`
        expect(Logger.warn).to.have.been.called.always.with(msg)
        expect(Logger.warn).to.have.been.called.exactly(coinCount * 2)
        expect(await factory.marketCount()).to.equal(1 + coinCount)
      })

      it('resolves old round and creates a new round after 6 days', async () => {
        const roundUpdatedAt = await addRounds(factory, 6, 1)
        const now = roundUpdatedAt.plus({ minutes: 15 }).toMillis()
        spy.on(Settings, 'now', () => now)
        await poke(factory.address)
        expect(await factory.marketCount()).to.equal(1 + coinCount * 2)

        let nextResolutionTime = DateTime.fromObject({
          year: 2021,
          month: 8,
          day: 13,
          hour: 16,
          zone: 'America/New_York',
        })
        const coin: Coin = await factory.getCoin(1)
        const market = await factory.getMarketDetails(coin.currentMarket)
        expect(market.resolutionTime).to.equal(BigNumber.from(nextResolutionTime.toSeconds()))
      })
    })
  })
})

async function addRounds(
  factory: CryptoCurrencyMarketFactoryV3,
  maxRounds: number,
  skipFirstRounds = 0,
): Promise<DateTime> {
  const coins: Coin[] = (await factory.getCoins()).slice(1)
  const start = DateTime.fromObject({
    year: 2021,
    month: 8,
    day: 1,
    hour: 16,
    millisecond: 10, // setting this in purpose to make sure we're handling seconds properly
    zone: 'America/New_York',
  })

  for (const coin of coins) {
    let roundId = 1
    let phaseId = 1
    let currentRound = new RoundManagement(phaseId, roundId)
    const fakePrice = await ethers.getContract(`PriceFeed${coin.name}`)

    for (; roundId < maxRounds; ++roundId) {
      if (roundId >= skipFirstRounds) {
        const roundDate = BigNumber.from(Math.floor(start.plus({ days: roundId }).toSeconds()))
        await fakePrice.addRound(currentRound.id, roundId, roundDate, roundDate, roundId)
      }
      currentRound = currentRound.nextRound()
    }
  }

  return start.plus({ days: maxRounds - 1 })
}

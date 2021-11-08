import { Requester } from '@chainlink/ea-bootstrap'
import { AdapterRequest, AdapterResponse } from '@chainlink/types'
import { execute } from '../../src/adapter'
import MockDate from 'mockdate'
import { makeMockDataServer, StopServer, WithOverride } from '../utils/data-server'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { Contract, Signer, BigNumber } from 'ethers'
import { Config } from '../../src/config'
import { expect } from './chai-setup'

describe('NFL createMarket execute', () => {
  const JOB_ID = '1'
  const DATE = '2021-08-05T00:00:00'
  const EVENT = {
    id: BigNumber.from(17660),
    lines: [0, -25, 315].map(BigNumber.from),
    estimatedStartTime: BigNumber.from(1628208000),
    home: {
      id: BigNumber.from(28),
      name: 'Pittsburgh Steelers',
      score: {
        raw: BigNumber.from(16),
        expected: BigNumber.from(160),
      },
    },
    away: {
      id: BigNumber.from(9),
      name: 'Dallas Cowboys',
      score: {
        raw: BigNumber.from(3),
        expected: BigNumber.from(30),
      },
    },
  }

  describe('successful calls @integration', () => {
    let config: Config
    let withMockResponse: WithOverride<AdapterResponse>
    let stopMockSDataServer: StopServer
    before('start mock data server', async () => {
      const { startServer, stopServer, withOverride } = makeMockDataServer()
      startServer()
      stopMockSDataServer = stopServer
      withMockResponse = withOverride

      const { deployer } = await getNamedAccounts()
      const signer: Signer = await ethers.getSigner(deployer)
      config = {
        ...Requester.getDefaultConfig(''),
        verbose: true,
        signer,
      }
    })
    after('stop mock data server', () => {
      stopMockSDataServer()
    })

    beforeEach('set date', () => {
      MockDate.set(DATE)
    })
    afterEach('reset date', () => {
      MockDate.reset()
    })

    let nflMarketFactory: Contract
    beforeEach('deploy smart contracts', async () => {
      await deployments.fixture(['Sports'])
      nflMarketFactory = await ethers.getContract('NFLMarketFactoryV3')
    })

    describe('Create event', () => {
      let creationResponse: AdapterResponse
      beforeEach('create event', async () => {
        const testData: AdapterRequest = {
          id: JOB_ID,
          data: {
            method: 'create',
            sport: 'NFL',
            daysInAdvance: 1,
            startBuffer: 60,
            affiliateIds: [1, 3],
            contractAddress: nflMarketFactory.address,
          },
        }
        creationResponse = await execute(testData, {}, config)
      })

      it('verify creation event response', () => {
        expect(typeof creationResponse.result).to.equal('object')
        expect(Array.isArray(creationResponse.result.successes)).to.be.true
        expect(creationResponse.result.successes.length).to.equal(1)
        expect(creationResponse.result.successes[0].event?.id).to.deep.equal(EVENT.id)
      })

      it('verify that event was created', async () => {
        const eventStruct = await nflMarketFactory.getSportsEvent(EVENT.id).then(processSportsEvent)
        expect(eventStruct).to.deep.equal({
          status: SportsEventStatus.Scheduled,
          markets: [1, 2, 3].map(BigNumber.from),
          lines: EVENT.lines,
          estimatedStartTime: EVENT.estimatedStartTime,
          homeTeamId: EVENT.home.id,
          awayTeamId: EVENT.away.id,
          homeTeamName: EVENT.home.name,
          awayTeamName: EVENT.away.name,
          homeScore: BigNumber.from(0),
          awayScore: BigNumber.from(0),
        })
      })

      describe('Resolve event', () => {
        let resolutionResponse: AdapterResponse
        beforeEach('resolve event', async () => {
          const testData: AdapterRequest = {
            id: JOB_ID,
            data: {
              method: 'resolve',
              sport: 'NFL',
              contractAddress: nflMarketFactory.address,
            },
          }
          resolutionResponse = await execute(testData, {}, config)
          // resolutionResponse = await withMockResponse(
          //   "/nfl/scores/json/Scores/2021PRE",
          //   JSON.stringify([
          //     {
          //       "GameKey":"202120028",
          //       "SeasonType":2,
          //       "Season":2021,
          //       "Week":0,
          //       "Date":"2021-08-05T20:00:00",
          //       "AwayTeam":"DAL","HomeTeam":"PIT",
          //       "Channel":"FOX",
          //       "PointSpread":-2.5,
          //       "OverUnder":31.5,
          //       "StadiumID":46,
          //       "Canceled":false,
          //       "GeoLat":null,
          //       "GeoLong":null,
          //       "ForecastTempLow":64,"ForecastTempHigh":64,"ForecastDescription":"Few Clouds","ForecastWindChill":64,"ForecastWindSpeed":5,"AwayTeamMoneyLine":130,"HomeTeamMoneyLine":-150,"Day":"2021-08-05T00:00:00","DateTime":"2021-08-05T20:00:00","GlobalGameID":17660,"GlobalAwayTeamID":9,"GlobalHomeTeamID":28,"ScoreID":17660,"Status":"Final","StadiumDetails":{"StadiumID":46,"Name":"Tom Benson Hall of Fame Stadium","City":"Canton","State":"OH","Country":"USA","Capacity":23000,"PlayingSurface":"Artificial","GeoLat":40.819906,"GeoLong":-81.398157,"Type":"Outdoor"}}]
          //   () => execute(testData, {}, config)
        })

        it('verify that event resolved', async () => {
          const eventStruct = await nflMarketFactory
            .getSportsEvent(EVENT.id)
            .then(processSportsEvent)
          expect(eventStruct).to.deep.equal({
            status: SportsEventStatus.Final,
            markets: [1, 2, 3].map(BigNumber.from),
            lines: EVENT.lines,
            estimatedStartTime: EVENT.estimatedStartTime,
            homeTeamId: EVENT.home.id,
            awayTeamId: EVENT.away.id,
            homeTeamName: EVENT.home.name,
            awayTeamName: EVENT.away.name,
            homeScore: EVENT.home.score.expected,
            awayScore: EVENT.away.score.expected,
          })
        })
      })
    })

    //
    // Dates.forEach((date) => {
    //   describe(`${date} creation`, () => {
    //
    //     let eventId: BigNumber;
    //
    //     it(`${date} create`, async () => {
    //       let testData = {
    //         id: JOB_ID,
    //         data: {
    //           method: 'create',
    //           sport: 'NFL',
    //           daysInAdvance: 1,
    //           startBuffer: 60,
    //           affiliateIds: [1, 3],
    //           contractAddress: nflMarketFactory.address,
    //         },
    //       }
    //
    //       const data = await execute(testData as AdapterRequest, {} as AdapterContext, config)
    //       console.log(JSON.stringify(data, null, 2))
    //
    //       expect(typeof data.result).to.equal("object");
    //       expect(Array.isArray(data.result.successes)).to.be.true;
    //       expect(data.result.successes.length).to.be.greaterThanOrEqual(1); // every date we use has at least one event to create
    //       eventId = data.result.successes[0].event.id;
    //     });
    //
    //     it(`${date} verify creation`, async () => {
    //       console.log("MARINA", eventId)
    //       await sleep(10000);
    //       const eventStruct = await nflMarketFactory.getSportsEvent(eventId);
    //       console.log(JSON.stringify(eventStruct, null, 2))
    //       expect(eventStruct).to.deep.equal({});
    //     })
    //   })
    //
    // })
    //
    // Dates.forEach((date) => {
    //   MockDate.set(date)
    //
    //   it(`${date} resolve`, async () => {
    //     let testData = {
    //       id: JOB_ID,
    //       data: {
    //         method: 'resolve',
    //         sport: 'NFL',
    //         contractAddress: nflMarketFactory.address,
    //       },
    //     }
    //
    //     const data = await execute(testData as AdapterRequest, {} as AdapterContext, config)
    //   })
    //
    //   // it(`${date} verify resolution`, async () => {
    //   //   const eventIndex = (await nflMarketFactory.eventCount()).sub(1);
    //   //   const eventStruct = await nflMarketFactory.getSportsEventByIndex(eventIndex);
    //   //   expect(eventStruct).to.deep.equal({});
    //   // })
    //
    //   MockDate.reset()
    // })
  })
})

// enum SportsEventStatus {Unknown, Scheduled, Final, Postponed, Canceled}
// struct SportsEvent {
//     SportsEventStatus status;
//     uint256[] markets;
//     int256[] lines;
//     uint256 estimatedStartTime;
//     uint256 homeTeamId;
//     uint256 awayTeamId;
//     string homeTeamName;
//     string awayTeamName;
//     uint256 homeScore;
//     uint256 awayScore;
// }
enum SportsEventStatus {
  Unknown,
  Scheduled,
  Final,
  Postponed,
  Canceled,
}
type RawSportsEvent = [
  number,
  [BigNumber, BigNumber, BigNumber],
  [BigNumber, BigNumber, BigNumber],
  BigNumber,
  BigNumber,
  BigNumber,
  string,
  string,
  BigNumber,
  BigNumber,
]
type SportsEvent = {
  status: SportsEventStatus
  markets: BigNumber[]
  lines: BigNumber[]
  estimatedStartTime: BigNumber
  homeTeamId: BigNumber
  awayTeamId: BigNumber
  homeTeamName: string
  awayTeamName: string
  homeScore: BigNumber
  awayScore: BigNumber
}
function processSportsEvent([
  status,
  markets,
  lines,
  estimatedStartTime,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
]: RawSportsEvent): SportsEvent {
  return {
    status,
    markets,
    lines,
    estimatedStartTime,
    homeTeamId,
    awayTeamId,
    homeTeamName,
    awayTeamName,
    homeScore,
    awayScore,
  }
}

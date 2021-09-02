import {
  calcHomeSpread,
  ensureNegative,
  ensurePositive,
  TeamSchedule,
} from '../../src/dataProviders/sportsdataio'

describe('calculations', () => {
  describe('calcHomeSpread', () => {
    enum r {
      zero,
      positive,
      negative,
    }
    const testcases = [
      // favor the most negative line
      { spread: 1.5, home: -1, away: +1, result: 1.5 },
      { spread: 1.5, home: -2, away: -1, result: 1.5 },
      { spread: 1.5, home: +1, away: -1, result: -1.5 },
      { spread: 1.5, home: -1, away: -2, result: -1.5 },

      // input sign shouldn't matter
      { spread: -1.5, home: -1, away: +1, result: 1.5 },
      { spread: -1.5, home: -2, away: -1, result: 1.5 },
      { spread: -1.5, home: +1, away: -1, result: -1.5 },
      { spread: -1.5, home: -1, away: -2, result: -1.5 },

      // if lines are the same then spread should be zero anyway
      { spread: 0, home: -1, away: -1, result: 0 },

      // if a field is missing then return zero
      { spread: null, home: -1, away: -1, result: 0 },
      { spread: 1.5, home: null, away: -1, result: 0 },
      { spread: 1.5, home: -1, away: null, result: 0 },
    ]

    for (const testcase of testcases) {
      const { spread, home, away, result } = testcase
      it(`calc with lines ${home}:${away} :: ${spread} -> ${result}`, () => {
        const event = makeFakeEvent({
          PointSpread: spread,
          HomeTeamMoneyLine: home,
          AwayTeamMoneyLine: away,
        })
        const calc = calcHomeSpread(event)
        expect(calc).toEqual(result)
      })
    }
  })
})

function makeFakeEvent(override: Partial<TeamSchedule>): TeamSchedule {
  return {
    Date: '',
    GameID: 0,
    AwayTeamName: '',
    AwayTeamID: 0,
    HomeTeamName: '',
    HomeTeamID: 0,
    Status: '',
    PointSpread: null,
    AwayTeamMoneyLine: null,
    HomeTeamMoneyLine: null,
    OverUnder: null,
    ...override,
  }
}

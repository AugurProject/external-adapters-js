import { Requester, Validator } from '@chainlink/external-adapter'
import { AdapterRequest, Config, Override } from '@chainlink/types'
import { NAME as AdapterName } from '../config'

export const NAME = 'price'

const customError = (data: any) => data.Response === 'Error'

const customParams = {
  base: ['base', 'from', 'coin', 'ids'],
  quote: ['quote', 'to', 'market', 'convert'],
  overrides: false,
}

const overrideSymbol = (overrides: Override | undefined, symbol: string): string => {
  const newSymbol = overrides?.get(AdapterName.toLowerCase())?.get(symbol.toLowerCase())
  if (newSymbol) return newSymbol
  return symbol
}

export const execute = async (config: Config, request: AdapterRequest) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  const symbol = overrideSymbol(validator.validated.data.overrides, validator.validated.data.base)
  const convert = validator.validated.data.quote.toUpperCase()
  const jobRunID = validator.validated.id
  const url = `/currencies/ticker`

  const params = {
    ids: symbol.toUpperCase(),
    convert,
    key: config.apiKey,
  }
  const reqConfig = {
    ...config.api,
    url,
    params,
  }

  const response = await Requester.request(reqConfig, customError)
  const result = Requester.validateResultNumber(response.data[0], ['price'])
  return Requester.success(jobRunID, {
    data: { ...response.data[0], result },
    result,
    status: 200,
  })
}

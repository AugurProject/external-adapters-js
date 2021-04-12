import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { ExecuteWithConfig, Config } from '@chainlink/types'

/**
 * @swagger
 * endpoints:
 *  globalmarketcap:
 *    properties:
 *      - market
 *      - to
 *      - quote
 *      - coin
 *    required:
 *      - oneOf:
 *        - market
 *        - to
 *        - quote
 *        - coin
 */

 /**
  * @swagger
  * endpoints:
  *  dominance:
  *    properties:
  *      - market
  *      - to
  *      - quote
  *      - coin
  *    required:
  *      - oneOf:
  *        - market
  *        - to
  *        - quote
  *        - coin
  */
export const NAME = 'global'

const customError = (data: any) => {
  if (Object.keys(data).length === 0) return true
  return false
}

export const customParams = {
  market: ['quote', 'to', 'market', 'coin'],
  path: true,
}

export const execute: ExecuteWithConfig<Config> = async (request, config) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id

  const market = validator.validated.data.market.toLowerCase()
  const path = validator.validated.data.path
  const url = '/global'

  const options = {
    ...config.api,
    url,
  }

  const response = await Requester.request(options, customError)
  response.data.result = Requester.validateResultNumber(response.data, ['data', path, market])

  return Requester.success(jobRunID, response, config.verbose)
}

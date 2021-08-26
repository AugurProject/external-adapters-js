import express from 'express'
import { readFileSync } from 'fs'

const server = express()
const RESOURCE_ROOT = __dirname + '/snapshotMMAData'

function loadResource(pathToResource: string) {
  let buf: string = readFileSync(pathToResource).toString()
  return JSON.parse(buf)
}

const season2021 = loadResource(RESOURCE_ROOT + '/mma/json/Schedule/UFC/2021.json')

//@ts-ignore
server.get('/mma/scores/json/Schedule/UFC/2021', (req, res) => {
  res.json(season2021)
})

server.get('/mma/stats/json/Fight/:id', (req, res) => {
  try {
    let { id } = req.params
    let pathToResource = RESOURCE_ROOT + `/mma/json/Fight/${id}.json`
    let fight = loadResource(pathToResource)
    res.json(fight)
  } catch (e) {
    res.send('')
  }
})

server.get('/mma/scores/json/Event/:eventId', (req, res) => {
  try {
    let { eventId } = req.params
    let pathToResource = RESOURCE_ROOT + `/mma/json/Event/${eventId}.json`
    let event = loadResource(pathToResource)
    res.json(event)
  } catch (e) {
    res.send('')
  }
})

export default server

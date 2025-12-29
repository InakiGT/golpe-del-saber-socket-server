import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import config from './config/index.js'
import bindSockets from './sockets.js'

const app = express()
const server = createServer(app)

app.use(cors())

const io = new Server(server, {
  path: config.path,
  cors: {
    origin: config.allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

bindSockets(io)

app.get('/', (_, res) => {
  res.json({
    msg: 'Golpe del saber websocket server is working'
  })
})

server.listen(config.port, () => {
  console.log(`App listening on PORT ${ config.port }`)
})

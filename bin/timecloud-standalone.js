#!/usr/bin/env node
'use strict'
const http = require('http')
const Core = require('timecloud-core')
const express = require('express')
const program = require('commander')

program
  .option('-d, --db <db>', '[required] Mongo connection string, same as Timecloud connection string')
  .option('-c, --collection <collection>', '[optional] Mongo collection, same as Timecloud collection name, default timecloudJobs', 'timecloudJobs')
  .option('-p, --port <port>', '[optional] Server port, default 3000', (n, d) => Number(n) || d, 3000)
  .option('-t, --title <title>', '[optional] Page title, default Timecloud', 'Timecloud')
  .parse(process.argv)

if (!program.db) {
  console.error('--db required')
  process.exit(1)
}

const app = express()

const core = new Core().database(program.db, program.collection)
app.use('/', require('../app')(core, {
  title: program.title
}))

app.set('port', program.port)

const server = http.createServer(app)
server.listen(program.port, () => {
  console.log(`Timecloud-front started http://localhost:${program.port}`)
})

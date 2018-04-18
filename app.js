'use strict'
const path = require('path')

module.exports = (core, options) => {
  options = options || {}
  if (!options.middleware) {
    options.middleware = 'express'
  }

  const front = require('./lib/front')(core, options)

  try {
    const middlewarePath = path.join(__dirname, 'lib/middlewares', options.middleware)
    return require(middlewarePath)(front)
  } catch (err) {
    throw new Error('No middleware available for ' + options.middleware)
  }
}

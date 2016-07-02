'use strict'

const miss = require('mississippi')
const Wreck = require('wreck')
const generateToken = require('../lib/generate-token')
const config = require('../config')
const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-saksbehandling-fara-import'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': add-to-fara-log')

  wreckOptions.payload = JSON.stringify({data: [ item.fara ]})

  Wreck.post(config.API_URL, wreckOptions, function (error, response, payload) {
    if (error) {
      item.errors.push(JSON.stringify(error))
    }
    return callback(null, JSON.stringify(item))
  })
})

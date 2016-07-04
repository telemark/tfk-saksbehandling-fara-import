'use strict'

const miss = require('mississippi')
const transportByTbr = require('tfk-saksbehandling-skoleskyss-tbr')
const transportByNSB = require('tfk-saksbehandling-skoleskyss-nsb')
const transportByFara = require('tfk-saksbehandling-skoleskyss-fara')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': running-transport-filters')

  var options = {
    postnummer: 3681,
    skoleid: 3880
  }

  console.log(item._id + ': running-filter-tbr')
  console.log(transportByTbr(options))

  console.log(item._id + ': running-filter-nsb')
  console.log(transportByNSB(options))

  console.log(item._id + ': running-filter-fara')
  console.log(transportByFara(options))

  return callback(null, JSON.stringify(item))
})

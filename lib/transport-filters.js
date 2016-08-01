'use strict'

const miss = require('mississippi')
const transportByTbr = require('tfk-saksbehandling-skoleskyss-tbr')
const transportByNSB = require('tfk-saksbehandling-skoleskyss-nsb')
const transportByFara = require('tfk-saksbehandling-skoleskyss-fara')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': running-transport-filters')

  var options = {
    postnummer: item.dsfData.POSTN,
    skoleid: item.skoleData.id
  }

  console.log(item._id + ': running-filter-tbr')
  item.fara.tbr = transportByTbr(options).toString()

  console.log(item._id + ': running-filter-nsb')
  item.fara.nsb = transportByNSB(options).toString()

  console.log(item._id + ': running-filter-fara')
  item.fara.fara = transportByFara(options).toString()

  return callback(null, JSON.stringify(item))
})

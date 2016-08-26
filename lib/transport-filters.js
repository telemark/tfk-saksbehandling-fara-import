'use strict'

const miss = require('mississippi')
const transportByTbr = require('tfk-saksbehandling-skoleskyss-tbr')
const transportByNSB = require('tfk-saksbehandling-skoleskyss-nsb')
const transportByFara = require('tfk-saksbehandling-skoleskyss-fara')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': running-transport-filters')

  var options = {
    skoleid: item.skoleData.id,
    postnummer: item.dsfData.POSTN,
    gatenavn: item.dsfData.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
    husnummer: item.dsfData.ADR.replace(/\D/g, '')
  }
  console.log(options)

  if (item.badApples || !options.husnummer) {
    console.log(item._id + ': skipped running-filters')
    item.fara.tbr = '?'
    item.fara.nsb = '?'
    item.fara.fara = '?'
  } else {

    console.log(item._id + ': running-filter-tbr')
    item.fara.tbr = transportByTbr(options).toString()
    console.log(item._id + ': running-filter-nsb')
    item.fara.nsb = transportByNSB(options).toString()
    console.log(item._id + ': running-filter-fara')
    item.fara.fara = transportByFara(options).toString()
  }

  return callback(null, JSON.stringify(item))
})

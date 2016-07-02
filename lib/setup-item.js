'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.dsfData.NAVN)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE

  var template = require('./data/template.json')
  var s = Object.assign(template, item)
  var data = {
    navn: s.dsfData.NAVN,
    epost: s.korData.Email,
    telefon: s.korData.MobilePhone,
    id: s.korData.uid,
    adresse: s['see-dsf'].data.VEGADRESSE,
    skoleNavn: s.skoleData.name,
    klasseTrinn: s.velgklasse.klassetrinn,
    distanse: s['distance-see-dsf'].data.distance,
    kartUrl: s['distance-see-dsf'].data.staticMapUrl,
    busskort: s.busskort.mottattBusskort,
    busskortNr: s.busskortNummer,
    grunnlag: s.grunnlag.grunnlag,
    uendret: s.soknaduendret,
    duplikat: s.duplikatSoknad,
    timestamp: s.timeStamp
  }
  item.fara = data

  return callback(null, JSON.stringify(item))
})

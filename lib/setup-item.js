'use strict'

const miss = require('mississippi')
const config = require('../config')
const birthdateFromId = require('birthdate-from-id')

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
    telefon: s.korData.MobilePhone,
    født: birthdateFromId(s.korData.uid),
    adresse: s['see-dsf'].data.VEGADRESSE,
    adresse2: '',
    skoleNavn: s.skoleData.name,
    klasseTrinn: s.velgklasse.klassetrinn,
    busskort: s.busskort.mottattBusskort,
    busskortNr: s.busskortnummer.busskortNummer,
    manuell: item.saksbehandlingsResultat.manuell.toString(),
    avslag: item.saksbehandlingsResultat.avslag.toString(),
    innvilget: item.saksbehandlingsResultat.manuell.toString(),
    uendret: s.soknaduendret.toString(),
    duplikat: s.duplikatSoknad.toString(),
    innsendtDato: s.archive.date,
    timestamp: s.timeStamp
  }
  item.fara = data

  return callback(null, JSON.stringify(item))
})

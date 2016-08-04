'use strict'

const miss = require('mississippi')
const config = require('../config')
const birthdateFromId = require('birthdate-from-id')

function bosted (s) {
  var adr = false
  if (s.bosteddelt.ADR) {
    adr = s.bosteddelt.ADR + ', ' + s.bosteddelt.POSTN + ' ' + s.bosteddelt.POSTS
  }
  if (s.bostedhybel.ADR) {
    adr = s.bostedhybel.ADR + ', ' + s.bostedhybel.POSTN + ' ' + s.bostedhybel.POSTS
  }
  return adr
}

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.dsfData.NAVN)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE

  var template = require('./data/template.json')
  var s = Object.assign(template, item)
  var data = {
    navn: s.dsfData.NAVN || '-',
    telefon: s.korData.MobilePhone || '-',
    født: birthdateFromId(s.korData.uid) || '-',
    adresse: s['see-dsf'].data.VEGADRESSE || '-',
    adresse2: bosted(s) || '-',
    skoleNavn: s.skoleData.name  || '-',
    klasseTrinn: s.velgklasse.klassetrinn || '-',
    // busskort: s.busskort.mottattBusskort,
    busskortNr: s.busskortnummer.busskortNummer || '-',
    manuell: item.saksbehandlingsResultat.manuell.toString() || '-',
    avslag: item.saksbehandlingsResultat.avslag.toString() || '-',
    innvilget: item.saksbehandlingsResultat.innvilget.toString() || '-',
    uendret: s.soknaduendret.toString() || '-',
    duplikat: s.duplikatSoknad.toString() || '-',
    innsendtDato: s.archive.date || '-',
    timestamp: s.timeStamp || '-',
    id: s.id || '-'
  }
  item.fara = data

  return callback(null, JSON.stringify(item))
})

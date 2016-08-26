'use strict'

const miss = require('mississippi')
const config = require('../config')
const fs = require('fs')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.dsfData.NAVN)
  console.log(item._id + ': bad-apples')

  if (!item.dsfData.ADR || !item.dsfData.POSTN || !item.dsfData.POSTS || !item.skoleData.id) {
    item.badApples = true
  }
  return callback(null, JSON.stringify(item))
})

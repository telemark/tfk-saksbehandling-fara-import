'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  const fileName = config.FARA_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0) {
    console.log(item._id + ': save-job-fara')
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  }

  return callback(null, JSON.stringify(item))
})

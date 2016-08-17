'use strict'

const miss = require('mississippi')
const config = require('../config')
const fs = require('fs')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.dsfData.NAVN)
  console.log(item._id + ': bad-apples')

  if (!item.dsfData.ADR || !item.skoleData.id) {
    var errFileName = config.ERROR_DIRECTORY_PATH + '/' + item._id + '.json'
    console.log(item._id + ': save-job-error')
    fs.writeFileSync(errFileName, JSON.stringify(item, null, 2))
    const jobFileName = config.JOB_DIRECTORY_PATH + '/' + item._id + '.json'
    console.log(item._id + ': cleanup-job')
    fs.unlinkSync(jobFileName)
    process.exit(1)
  } else {
    return callback(null, JSON.stringify(item))
  }
})

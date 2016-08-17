'use strict'

module.exports = function tfkSaksbehandlingFaraImport (item, callback) {
  const miss = require('mississippi')
  const getNextJob = require('./lib/get-next-job')
  const badApples = require('./lib/bad-apples')
  const setupItem = require('./lib/setup-item')
  const transportFilters = require('./lib/transport-filters')
  const addToLog = require('./lib/add-to-log')
  const sendStatusMessage = require('./lib/send-status-message')
  const saveJobDone = require('./lib/save-job-done')
  const saveJobError = require('./lib/save-job-error')
  const cleanupJob = require('./lib/cleanup-job')
  const starter = fromString(JSON.stringify(item))

  function fromString (string) {
    return miss.from(function (size, next) {
      // if there's no more content
      // left in the string, close the stream.
      if (string.length <= 0) return next(null, null)

      // Pull in a new chunk of text,
      // removing it from the string.
      var chunk = string.slice(0, size)
      string = string.slice(size)

      // Emit "chunk" from the stream.
      next(null, chunk)
    })
  }

  function finished (error) {
    if (error) {
      callback(error, null)
    } else {
      callback(null, {message: 'Success'})
    }
  }
  miss.pipe(
    starter,
    getNextJob,
    badApples,
    setupItem,
    transportFilters,
    addToLog,
    sendStatusMessage,
    saveJobDone,
    saveJobError,
    cleanupJob,
    finished
  )
}

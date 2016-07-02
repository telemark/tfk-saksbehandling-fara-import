'use strict'

const saksbehandler = require('./index')

saksbehandler({}, function doSaksbehandling (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})

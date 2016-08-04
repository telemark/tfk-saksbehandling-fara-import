'use strict'

module.exports = {
  JWT_KEY: process.env.TFK_SFI_JWT_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_SFI_CALLBACK_STATUS_MESSAGE || 'Importert i fara',
  JOB_DIRECTORY_PATH: process.env.TFK_SFI_JOB_DIRECTORY_PATH || 'test/data/fara/jobs',
  DONE_DIRECTORY_PATH: process.env.TFK_SFI_DONE_DIRECTORY_PATH || 'test/data/fara/done',
  ERROR_DIRECTORY_PATH: process.env.TFK_SFI_ERROR_DIRECTORY_PATH || 'test/data/fara/errors',
  API_URL: process.env.TFK_SFI_API_URL || 'https://api.skoleskyss.t-fk.no/applications'
}

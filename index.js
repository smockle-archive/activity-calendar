require = require('@std/esm')(module)
module.exports = require('./main.mjs').default

// Strava
require('dotenv-safe').load()
var strava = require('strava-v3')

strava.athlete.get({}, function (err, payload, limits) {
  if (!err) {
    console.log(payload)
  } else {
    console.log(err)
  }
})

// Strava
import * as strava from 'strava-v3'
require('dotenv-safe').load()

strava.athlete.get({}, function (err, payload, limits) {
  if (!err) {
    console.log(payload)
  } else {
    console.log(err)
  }
})

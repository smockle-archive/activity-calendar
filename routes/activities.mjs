import * as strava from 'strava-v3'
require('dotenv-safe').load()

export default function (request, response) {
  strava.athlete.listActivities({}, (error, activities, limits) => {
    if (!error) {
      response.send(activities)
    } else {
      response.send(error)
    }
  })
}

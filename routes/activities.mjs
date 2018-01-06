import * as strava from 'strava-v3'
require('dotenv-safe').load()

export default function (request, response) {
  strava.athlete.listActivities(
    { access_token: request.params.access_token },
    (error, activities, limits) => {
      if (!error) {
        response.send(activities)
      } else {
        response.send(error)
      }
    }
  )
}

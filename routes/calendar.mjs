import * as ics from 'ics'
import toEvent from '../lib/to-event'
import * as strava from 'strava-v3'
require('dotenv-safe').load()

export default function (request, response) {
  strava.athlete.listActivities({}, (error, activities, limits) => {
    if (!error) {
      ics.createEvent(
        activities.map(toEvent),
        'smockle/ics',
        (error, events) => {
          if (error) response.send(error)
          response.send(events)
        }
      )
    } else {
      response.send(error)
    }
  })
}

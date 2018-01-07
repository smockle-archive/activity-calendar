import { createEvent as createCalendar } from 'ics'
import toEvent from '../lib/to-event'
import * as strava from 'strava-v3'
require('dotenv-safe').load()

export default function (request, response) {
  strava.athlete.listActivities(
    { access_token: request.params.access_token },
    async (error, activities, limits) => {
      if (!error) {
        const events = await Promise.all(activities.map(toEvent))
        createCalendar(events, 'smockle/ics', (error, events) => {
          if (error) response.send(error)
          response.send(events)
        })
      } else {
        response.send(error)
      }
    }
  )
}

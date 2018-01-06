#!/usr/bin/env node
// import * as strava from 'strava-v3'
// require('dotenv-safe').load()

// strava.athlete.listActivities({}, (err, payload, limits) => {
//   if (!err) {
//     console.log(payload)
//   } else {
//     console.log(err)
//   }
// })

import * as ics from 'ics'
import { activities } from '../data/activities'
import toEvent from '../lib/to-event'

ics.createEvent(activities.map(toEvent), 'smockle/ics', (error, value) => {
  if (error) throw error
  console.log(value)
})

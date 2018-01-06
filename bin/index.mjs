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

import { activities } from '../data/activities'
import toEvent from '../lib/to-event'

console.log(activities.map(toEvent))

// activities.map(toEvent).map(event => {
//   ics.createEvent(event, (error, value) => {
//     if (error) throw error
//     console.log(value)
//   })
// })

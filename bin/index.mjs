#!/usr/bin/env node
import { createEvent as createCalendar } from 'ics'
import { activities } from '../data/activities'
import toEvent from '../lib/to-event'
  ;(async function () {
  const events = await Promise.all(activities.map(toEvent))
  createCalendar(events, 'smockle/ics', (error, value) => {
    if (error) throw error
    console.log(value)
  })
})()

#!/usr/bin/env node
import * as ics from 'ics'
import { activities } from '../data/activities'
import toEvent from '../lib/to-event'

ics.createEvent(activities.map(toEvent), 'smockle/ics', (error, value) => {
  if (error) throw error
  console.log(value)
})

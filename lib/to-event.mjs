import uuid from 'uuid/v4'
import { round } from 'lodash'
import toMiles from './to-miles'
import toDateArray from './to-date-array'

export default function toEvent (activity) {
  return {
    title: `${activity.name} (${round(toMiles(activity.distance), 1)} mi)`,
    start: toDateArray(activity.start_date),
    duration: { seconds: activity.elapsed_time },
    url: `https://www.strava.com/activities/${activity.id}`,
    geo: { lat: activity.start_latitude, lon: activity.start_longitude },
    uid: uuid()
  }
}

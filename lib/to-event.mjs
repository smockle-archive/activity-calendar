import uuid from 'uuid/v4'
import { round } from 'lodash'
import to from 'await-to-js'
import reverseGeocode from './reverse-geocode'
import to5 from './to-5'
import toMiles from './to-miles'
import toDateArray from './to-date-array'

export default async function toEvent (activity) {
  const event = {
    title: `${activity.name} (${round(toMiles(activity.distance), 1)} mi)`,
    start: toDateArray(activity.start_date),
    duration: { minutes: to5(activity.elapsed_time / 60) },
    url: `https://www.strava.com/activities/${activity.id}`,
    uid: uuid()
  }
  // When location data exists, use it to set GEO and LOCATION
  if (activity.start_latitude && activity.start_longitude) {
    const { start_latitude: latitude, start_longitude: longitude } = activity
    const [error, location] = await to(reverseGeocode(latitude, longitude))
    if (error) {
      console.log(error)
    } else if (location) {
      event.location = location.replace(/,/g, '\\,').replace(/;/g, '\\;')
    }
    event.geo = { lat: latitude, lon: longitude }
  }
  return event
}

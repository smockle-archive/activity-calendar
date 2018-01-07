import geocoder from 'geocoder'
import memoize from 'memoizee'
import { get } from 'lodash'

function reverseGeocode (latitude, longitude) {
  return new Promise((resolve, reject) => {
    geocoder.reverseGeocode(latitude, longitude, (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(get(data, 'results[0].formatted_address'))
    })
  })
}

export default memoize(reverseGeocode, { promise: true })

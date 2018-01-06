require = require('@std/esm')(module)
module.exports = {
  to5: require('./to-5').default,
  toDateArray: require('./to-date-array.mjs').default,
  toEvent: require('./to-event.mjs').default,
  toMiles: require('./to-miles.mjs').default
}

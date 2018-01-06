import toEvent from '../lib/to-event'
import test from 'tape'

test('toEvent, with latlon', t => {
  t.plan(7)
  const activity = {
    id: 1330000001,
    resource_state: 2,
    external_id: 'garmin_push_2410000000',
    upload_id: 1440000001,
    athlete: { id: 9000000, resource_state: 1 },
    name: 'Morning Run',
    distance: 3284.6,
    moving_time: 1092,
    elapsed_time: 1092,
    total_elevation_gain: 0,
    type: 'Run',
    start_date: '2018-01-02T16:38:40Z',
    start_date_local: '2018-01-02T08:38:40Z',
    timezone: '(GMT-08:00) America/Los_Angeles',
    utc_offset: -28800,
    start_latlng: [37.77, -122.41],
    end_latlng: [37.77, -122.41],
    location_city: null,
    location_state: null,
    location_country: 'United States',
    start_latitude: 37.77,
    start_longitude: -122.41,
    achievement_count: 0,
    kudos_count: 1,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: {
      id: 'a1338000000',
      summary_polyline: 'aaaaA~ovjVTzCjpA{J{pArJ[gC',
      resource_state: 2
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    gear_id: 'g000000',
    from_accepted_tag: false,
    average_speed: 3.008,
    max_speed: 6.5,
    has_heartrate: false,
    elev_high: 9,
    elev_low: 7,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    workout_type: null
  }
  const expected = {
    title: 'Morning Run (2 mi)',
    start: [2018, 1, 2, 8, 40],
    duration: { minutes: 20 },
    url: 'https://www.strava.com/activities/1330000001',
    geo: { lat: 37.77, lon: -122.41 },
    uid: '73cbb678-92ff-46c2-9fae-4243ed307125'
  }
  const actual = toEvent(activity)
  t.equal(actual.title, expected.title, 'title')
  t.deepEqual(actual.start, expected.start, 'start')
  t.deepEqual(actual.duration, expected.duration, 'duration')
  t.equal(actual.url, expected.url, 'url')
  t.equal(actual.geo.lat, expected.geo.lat, 'geo.lat')
  t.equal(actual.geo.lon, expected.geo.lon, 'geo.lon')
  const { uid: _, ...expectedWithoutUID } = expected
  const { uid: __, ...actualWithoutUID } = actual
  t.deepEqual(expectedWithoutUID, actualWithoutUID, 'default')
})

test('toEvent, without latlon', t => {
  t.plan(5)
  const activity = {
    id: 1330000002,
    resource_state: 2,
    external_id: '2018-01-01T00:53:47.279Z',
    upload_id: 1440000002,
    athlete: { id: 9000000, resource_state: 1 },
    name: 'Afternoon Run',
    distance: 965.6,
    moving_time: 337,
    elapsed_time: 337,
    total_elevation_gain: 0,
    type: 'Run',
    start_date: '2018-01-01T00:53:47Z',
    start_date_local: '2017-12-31T16:53:47Z',
    timezone: '(GMT-08:00) America/Los_Angeles',
    utc_offset: -28800,
    start_latlng: null,
    end_latlng: null,
    location_city: null,
    location_state: null,
    location_country: 'United States',
    start_latitude: null,
    start_longitude: null,
    achievement_count: 0,
    kudos_count: 0,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: { id: 'a1338000000', summary_polyline: null, resource_state: 2 },
    trainer: true,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    gear_id: 'g000000',
    from_accepted_tag: false,
    average_speed: 2.865,
    max_speed: 2.9,
    has_heartrate: false,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    workout_type: null
  }
  const expected = {
    title: 'Afternoon Run (0.6 mi)',
    start: [2017, 12, 31, 16, 55],
    duration: { minutes: 5 },
    url: 'https://www.strava.com/activities/1330000002',
    uid: '73cbb678-92ff-46c2-9fae-4243ed307125'
  }
  const actual = toEvent(activity)
  t.equal(actual.title, expected.title, 'title')
  t.deepEqual(actual.start, expected.start, 'start')
  t.deepEqual(actual.duration, expected.duration, 'duration')
  t.equal(actual.url, expected.url, 'url')
  const { uid: _, ...expectedWithoutUID } = expected
  const { uid: __, ...actualWithoutUID } = actual
  t.deepEqual(expectedWithoutUID, actualWithoutUID, 'default')
})

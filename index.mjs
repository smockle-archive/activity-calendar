import express from 'express'
import activities from './routes/activities'
import calendar from './routes/calendar'
require('dotenv-safe').load()

const app = express()
app.get('/activities/:access_token', activities)
app.get('/calendar/:access_token', calendar)
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
)

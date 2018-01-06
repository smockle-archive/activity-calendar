import to5 from './to-5'

export default function toDateArray (utcdate) {
  const date = new Date(utcdate)
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    to5(date.getMinutes())
  ]
}

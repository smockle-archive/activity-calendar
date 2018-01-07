import to5 from './to-5'

export default function toDateArray (utcdate) {
  const date = new Date(utcdate)
  const offset = to5(date.getMinutes()) - date.getMinutes()
  const adjustedDate = new Date(date.getTime() + offset * 60000)
  return [
    adjustedDate.getFullYear(),
    adjustedDate.getMonth() + 1,
    adjustedDate.getDate(),
    adjustedDate.getHours(),
    adjustedDate.getMinutes()
  ]
}

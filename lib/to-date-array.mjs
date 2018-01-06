export default function toDateArray (utcdate) {
  const date = new Date(utcdate)
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  ]
}

import { round } from 'lodash'

export default function to5 (number) {
  return parseInt(number / 5) * 5 + round((number % 5) / 5) * 5
}

import accumulate from './accumulate'
import iteratorRace from './iteratorRace'

export default async function accumulateRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number
) {
  return accumulate(iteratorRace(asyncIterable, ms))
}

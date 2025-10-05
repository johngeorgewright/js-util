import accumulate from './accumulate.js'
import iteratorRace from './iteratorRace.js'

export default async function accumulateRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number,
  signal?: AbortSignal
) {
  return accumulate(iteratorRace(asyncIterable, ms, signal))
}

import accumulate from './accumulate'
import iteratorRace from './iteratorRace'
import type { AbortSignal } from 'node-abort-controller'

export default async function accumulateRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number,
  signal?: AbortSignal
) {
  return accumulate(iteratorRace(asyncIterable, ms, signal))
}

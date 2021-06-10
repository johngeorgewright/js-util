import TimeoutError from './TimeoutError'
import detonate from './detonate'

export default async function detonateRace<T>(
  promise: Promise<T>,
  ms: number = 0,
  {
    error = new TimeoutError(ms),
    signal,
  }: {
    error?: Error
    signal?: AbortSignal
  } = {}
) {
  return Promise.race([promise, detonate(ms, { error, signal })])
}

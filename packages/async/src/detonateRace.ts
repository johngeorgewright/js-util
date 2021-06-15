import TimeoutError from './TimeoutError'
import detonate from './detonate'
import AbortController from 'node-abort-controller'

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
  if (!signal) {
    const abortController = new AbortController()
    return Promise.race([
      promise.then((result) => {
        abortController.abort()
        return result
      }),
      detonate(ms, { error, signal: abortController.signal }),
    ])
  }

  return Promise.race([promise, detonate(ms, { error, signal })])
}

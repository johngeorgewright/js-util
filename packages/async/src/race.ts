import AbortError from './AbortError'
import AbortController, { AbortSignal } from 'node-abort-controller'

export default function race<T>(
  fn: (signal: AbortSignal) => Promise<T>[],
  signal?: AbortSignal
) {
  const abortController = new AbortController()

  if (signal) {
    if (signal.aborted) return Promise.reject(new AbortError())
    signal.addEventListener('abort', () => abortController.abort())
  }

  return Promise.race(fn(abortController.signal)).finally(() =>
    abortController.abort()
  )
}

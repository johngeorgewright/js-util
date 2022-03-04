import AbortError from './AbortError'
import { AbortController, AbortSignal } from 'node-abort-controller'

export default function race<T>(
  fn: (signal: AbortSignal) => Promise<T>[],
  signal?: AbortSignal
) {
  const abortController = new AbortController()
  const abort = () => abortController.abort()

  if (signal) {
    if (signal.aborted) return Promise.reject(new AbortError())
    signal.addEventListener('abort', abort, { once: true })
  }

  return Promise.race(fn(abortController.signal)).finally(() => {
    signal?.removeEventListener('abort', abort)
    abort()
  })
}

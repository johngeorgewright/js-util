import AbortError from './AbortError'
import TimeoutError from './TimeoutError'
import type { AbortSignal } from 'node-abort-controller'

export default async function detonate(
  ms: number = 0,
  {
    error = () => new TimeoutError(ms),
    signal,
  }: {
    error?: () => Error
    signal?: AbortSignal
  } = {}
) {
  return new Promise<never>((_, reject) => {
    if (signal?.aborted) return reject(new AbortError())

    const abort = () => {
      clearTimeout(timeout)
      reject(new AbortError())
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', abort)
      reject(error())
    }, ms)

    signal?.addEventListener('abort', abort, { once: true })
  })
}

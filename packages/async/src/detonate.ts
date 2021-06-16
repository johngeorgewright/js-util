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
    const timeout = setTimeout(() => reject(error()), ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new AbortError())
    })
  })
}

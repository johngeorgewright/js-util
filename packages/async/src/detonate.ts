import AbortError from './AbortError'
import TimeoutError from './TimeoutError'

export default async function detonate(
  ms: number = 0,
  {
    error = new TimeoutError(ms),
    signal,
  }: {
    ms?: number
    error?: Error
    signal?: AbortSignal
  } = {}
) {
  return new Promise<never>((_, reject) => {
    if (signal?.aborted) return
    const timeout = setTimeout(() => reject(error), ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new AbortError())
    })
  })
}

import { detonate } from '@johngw/async'
import AbortController, { AbortSignal } from 'node-abort-controller'

export default async function* iteratorRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number,
  signal?: AbortSignal
): AsyncIterable<T> {
  let asyncIterator: AsyncIterator<T> | undefined
  const [timer, abort] = createTimer(ms, signal)

  try {
    asyncIterator = await Promise.race([
      asyncIterable[Symbol.asyncIterator](),
      timer,
    ])

    while (true) {
      const { done, value } = await Promise.race([asyncIterator.next(), timer])

      if (done) {
        return asyncIterator?.return?.()
      } else {
        yield value
      }
    }
  } catch (error) {
    if (!error.isTimeoutError && !error.isAbortError) {
      throw error
    }
  } finally {
    abort()
    return asyncIterator?.return?.()
  }
}

function createTimer(
  ms: number,
  signal?: AbortSignal
): [Promise<never>, () => void] {
  const abortController = new AbortController()

  if (signal) {
    signal.addEventListener('abort', () => abortController.abort())
  }

  return [
    detonate(ms, { signal: abortController.signal }),
    () => abortController.abort(),
  ]
}

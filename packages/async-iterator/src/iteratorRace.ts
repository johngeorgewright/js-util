import { AbortError, detonate, TimeoutError } from '@johngw/async'

export default async function* iteratorRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number,
  signal?: AbortSignal
): AsyncIterable<T> {
  let asyncIterator: AsyncIterator<T> | undefined

  try {
    const timer = detonate(ms, { signal })

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
    if (!(error instanceof TimeoutError) || !(error instanceof AbortError)) {
      throw error
    }
  } finally {
    return asyncIterator?.return?.()
  }
}

import { detonate, TimeoutError } from '@johngw/async'

export default async function* iteratorRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number
): AsyncIterable<T> {
  let asyncIterator: AsyncIterator<T>

  try {
    const timer = detonate(ms)

    asyncIterator = await Promise.race([
      asyncIterable[Symbol.asyncIterator](),
      timer,
    ])

    while (true) {
      const { done, value } = await Promise.race([asyncIterator.next(), timer])

      if (done) {
        return asyncIterator.return && asyncIterator.return()
      } else {
        yield value
      }
    }
  } catch (error) {
    if (!(error instanceof TimeoutError)) {
      throw error
    }
  } finally {
    return asyncIterator! && asyncIterator.return && asyncIterator.return()
  }
}

import { isEmpty, map } from '@johngw/object'

/**
 * Combine async iterables and iterate through their results
 * as they arrive.
 *
 * @example
 * async function* a() {
 *   await timeout(5)
 *   yield 0
 *   await timeout(5)
 *   yield 2
 * }
 *
 * async function* b() {
 *   await timeout(8)
 *   yield 10
 * }
 *
 * for await (const item of combineIterators(a(), b())) {
 *   // 0
 *   // 10
 *   // 2
 * }
 */
export default async function* combineIterators<T>(
  ...asyncIterables: AsyncIterable<T>[]
) {
  const asyncIterators: Record<
    string,
    AsyncIterator<T>
  > = asyncIterables.reduce(
    (asyncIterators, asyncIterable, index) => ({
      ...asyncIterators,
      [index.toString()]: asyncIterable[Symbol.asyncIterator](),
    }),
    {}
  )

  const results = Array(asyncIterables.length)

  try {
    for (
      const iteration = map(asyncIterators, getNext);
      !isEmpty(iteration);

    ) {
      const { index, done, value } = await Promise.race(
        Object.values(iteration)
      )

      if (done) {
        delete iteration[index]
        results[Number(index)] = value
      } else {
        iteration[index] = getNext(asyncIterators[index], index)
        yield value
      }
    }
  } finally {
    for (const iterator of Object.values(asyncIterators))
      if (iterator.return) iterator.return()
  }

  return results
}

async function getNext<T>(asyncIterator: AsyncIterator<T>, index: string) {
  return asyncIterator.next().then(({ done, value }) => ({
    index,
    done,
    value,
  }))
}

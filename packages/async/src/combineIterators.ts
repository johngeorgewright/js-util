import { isEmpty, map } from '@johngw/object'

export default async function* combineIterators<T>(
  ...asyncIterables: AsyncIterable<T>[]
) {
  const asyncIterators: Record<string, AsyncIterator<T>> =
    asyncIterables.reduce(
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
    for (const iterator of Object.values(asyncIterators)) {
      if (iterator.return) {
        iterator.return()
      }
    }
  }

  return results

  async function getNext<T>(asyncIterator: AsyncIterator<T>, index: string) {
    return asyncIterator.next().then(({ done, value }) => ({
      index,
      done,
      value,
    }))
  }
}

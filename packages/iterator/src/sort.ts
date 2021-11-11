import { take } from '.'

export default function sort<T>(
  maxChunkSize: number,
  fn?: (a: T, b: T) => number
) {
  const _take = take<T>(maxChunkSize)
  return function* _sort(
    generator: Generator<T>
  ): Generator<T, any, undefined> {
    const collection = [..._take(generator)]
    if (!collection.length) return
    yield* collection.sort(fn)
    yield* _sort(generator)
  }
}

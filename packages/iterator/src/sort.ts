import { take } from '.'

export default function sort<T>(
  maxChunkSize: number,
  fn?: (a: T, b: T) => number
) {
  return function* _sort(
    generator: Generator<T>
  ): Generator<T, any, undefined> {
    const collection = [...take<T>(maxChunkSize)(generator)]
    if (!collection.length) return
    yield* collection.sort(fn)
    yield* _sort(generator)
  }
}

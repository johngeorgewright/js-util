import Builder from './Builder'

export default function separate<T>(
  input: ArrayLike<T>,
  predicate: (item: T) => boolean
): [T[], T[]] {
  const { length } = input
  const leftBuilder = new Builder<T>(length)
  const rightBuilder = new Builder<T>(length)

  for (let i = 0; i < length; i++) {
    const item = input[i]

    if (predicate(item)) {
      rightBuilder.add(item)
    } else {
      leftBuilder.add(item)
    }
  }

  return [leftBuilder.finish(), rightBuilder.finish()]
}

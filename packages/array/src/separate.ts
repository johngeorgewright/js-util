import Builder from './Builder'

export default function separate<T, R extends T, L extends Exclude<T, R>>(
  input: ArrayLike<T>,
  predicate: (item: T) => item is R
): [L[], R[]] {
  const { length } = input
  const leftBuilder = new Builder<L>(length)
  const rightBuilder = new Builder<R>(length)

  for (let i = 0; i < length; i++) {
    const item = input[i]

    if (predicate(item)) {
      rightBuilder.add(item)
    } else {
      leftBuilder.add(item as unknown as L)
    }
  }

  return [leftBuilder.finish(), rightBuilder.finish()]
}

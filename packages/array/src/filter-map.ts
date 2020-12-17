import Builder from './Builder'

export default function filterMap<In, Out>(
  input: ArrayLike<In>,
  filter: (item: In) => boolean,
  map: (item: In) => Out
) {
  const builder = new Builder<Out>(input.length)

  for (let i = 0; i < input.length; i++) {
    const item = input[i]

    if (filter(item)) {
      builder.add(map(item))
    }
  }

  return builder.finish()
}

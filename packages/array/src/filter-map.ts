import Builder from './Builder.js'

export default function filterMap<In, FilteredIn extends In, Out>(
  input: ArrayLike<In>,
  filter: (item: In) => item is FilteredIn,
  map: (item: FilteredIn) => Out
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

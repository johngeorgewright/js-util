export default function filterMap<In, Out>(
  input: ArrayLike<In>,
  filter: (item: In) => boolean,
  map: (item: In) => Out
) {
  const result: Out[] = new Array(input.length)
  let size = 0

  for (let i = 0; i < input.length; i++) {
    const item = input[i]

    if (filter(item)) {
      result[size++] = map(item)
    }
  }

  result.length = size
  return result
}

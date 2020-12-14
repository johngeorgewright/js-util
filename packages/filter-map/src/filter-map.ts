export default function filterMap<In, Out>(
  array: ArrayLike<In>,
  filter: (item: In) => boolean,
  map: (item: In) => Out
) {
  const result: Out[] = new Array(array.length)
  let size = 0

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

    if (filter(item)) {
      result[size++] = map(item)
    }
  }

  result.length = size
  return result
}

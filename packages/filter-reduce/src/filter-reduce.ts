export default function filterReduce<In, Out>(
  input: ArrayLike<In>,
  output: Out,
  filter: (acc: Out, item: In) => boolean,
  reduce: (acc: Out, item: In) => Out
) {
  for (let i = 0; i < input.length; i++) {
    const item = input[i]

    if (filter(output, item)) {
      output = reduce(output, item)
    }
  }

  return output
}

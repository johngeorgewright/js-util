export default function map<In, Out>(fn: (i: In) => Out) {
  return function* (generator: Generator<In>) {
    for (const item of generator) yield fn(item)
  }
}

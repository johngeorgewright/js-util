export default function filter<T>(fn: (i: T) => boolean) {
  return function* (generator: Generator<T>) {
    for (const item of generator) if (fn(item)) yield item
  }
}

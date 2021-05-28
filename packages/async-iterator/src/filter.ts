export default async function* filter<A, B extends A>(
  iterable: AsyncIterable<A>,
  filter: (item: A) => item is B
): AsyncIterable<B> {
  for await (const item of iterable) {
    if (filter(item)) {
      yield item
    }
  }
}

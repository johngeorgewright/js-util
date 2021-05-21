export default async function accumulate<T>(asyncIterable: AsyncIterable<T>) {
  const results: T[] = []

  for await (const result of asyncIterable) {
    results.push(result)
  }

  return results
}

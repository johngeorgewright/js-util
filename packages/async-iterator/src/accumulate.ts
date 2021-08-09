import type { AbortSignal } from 'node-abort-controller'

export default async function accumulate<T>(
  asyncIterable: AsyncIterable<T>,
  signal?: AbortSignal
) {
  const results: T[] = []

  for await (const result of asyncIterable) {
    if (signal?.aborted) break
    results.push(result)
  }

  return results
}

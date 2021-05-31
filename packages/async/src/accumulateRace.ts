import timeout from './timeout'

/**
 * @deprecated Use @johngw/async-iterator
 */
export default async function accumulateRace<T>(
  asyncIterable: AsyncIterable<T>,
  ms: number
) {
  const accumulated: T[] = []

  const accumulating = (async () => {
    for await (const item of asyncIterable) {
      accumulated.push(item)
    }
  })()

  return Promise.race([
    accumulating.then(() => accumulated),
    timeout(ms).then(() => accumulated),
  ])
}
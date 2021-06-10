import timeout from './timeout'

export default async function until(
  fn: () => Promise<boolean>,
  {
    interval,
    signal,
  }: {
    interval?: number
    signal?: AbortSignal
  }
) {
  let success = false

  do {
    success = await fn()
    await timeout(interval, signal)
  } while (!success)
}

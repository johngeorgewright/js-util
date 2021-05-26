import timeout from './timeout'

export default async function until(
  fn: () => Promise<boolean>,
  interval?: number
) {
  let success = false

  const wait: () => Promise<void> | void =
    typeof interval === 'undefined' ? () => {} : () => timeout(interval)

  do {
    success = await fn()
    await wait()
  } while (!success)
}

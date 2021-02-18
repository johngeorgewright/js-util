import timeout from './timeout'

export default async function until(
  fn: () => Promise<boolean>,
  interval: number
) {
  let result = await fn()

  while (!result) {
    await timeout(interval)
    result = await fn()
  }
}

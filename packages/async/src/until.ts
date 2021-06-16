import timeout from './timeout'
import type { AbortSignal } from 'node-abort-controller'

export default async function until(
  fn: (signal?: AbortSignal) => Promise<boolean>,
  {
    interval,
    signal,
  }: {
    interval?: number
    signal?: AbortSignal
  }
) {
  for (let success = await fn(signal); !success; success = await fn(signal)) {
    await timeout(interval, signal)
  }
}

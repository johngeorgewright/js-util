import AbortError from './AbortError'
import { AbortSignal } from 'node-abort-controller'

export default async function timeout(ms: number = 0, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(new AbortError())
    const timeout = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new AbortError())
    })
  })
}

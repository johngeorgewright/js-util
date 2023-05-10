import AbortError from './AbortError'

export default async function timeout(ms: number = 0, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(new AbortError())

    const abort = () => {
      clearTimeout(timeout)
      reject(new AbortError())
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', abort)
      resolve()
    }, ms)

    signal?.addEventListener('abort', abort, { once: true })
  })
}

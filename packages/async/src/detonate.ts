import TimeoutError from './TimeoutError'

export default async function detonate(
  ms: number = 0,
  error: Error = new TimeoutError(ms)
) {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(error), ms)
  })
}

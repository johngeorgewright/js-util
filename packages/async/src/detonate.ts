export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Exceeded ${ms}ms`)
  }
}

export default async function detonate(
  ms: number = 0,
  error: Error = new TimeoutError(ms)
) {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(error), ms)
  })
}

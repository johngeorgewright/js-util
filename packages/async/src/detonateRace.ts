import TimeoutError from './TimeoutError'
import detonate from './detonate'

export default async function detonateRace<T>(
  promise: Promise<T>,
  ms: number = 0,
  error: Error = new TimeoutError(ms)
) {
  return Promise.race([promise, detonate(ms, error)])
}

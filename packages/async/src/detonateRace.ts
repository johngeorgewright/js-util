import TimeoutError from './TimeoutError.js'
import detonate from './detonate.js'
import race from './race.js'

export default async function detonateRace<T>(
  promise: Promise<T>,
  ms = 0,
  {
    error = () => new TimeoutError(ms),
    signal,
  }: {
    error?: () => Error
    signal?: AbortSignal
  } = {}
) {
  return race((signal) => [promise, detonate(ms, { error, signal })], signal)
}

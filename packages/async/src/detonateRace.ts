import TimeoutError from './TimeoutError'
import detonate from './detonate'
import race from './race'

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

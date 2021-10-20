/**
 * Adds a counter to the function instructing how many
 * times the function has been called.
 */
export default function withCounter<Args extends unknown[], R>(
  fn: (counter: number, ...args: Args) => R,
  start = 0
) {
  let counter = start
  return (...args: Args) => fn(counter++, ...args)
}

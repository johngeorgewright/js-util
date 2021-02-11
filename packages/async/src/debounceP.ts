export default function debounceP<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>,
  ms: number
) {
  let lastResult: Promise<Return>
  let timeout: NodeJS.Timeout | void

  return async (...args: Args) => {
    if (timeout) {
      start()
      return lastResult
    }

    start()
    lastResult = fn(...args)
    return lastResult
  }

  function start() {
    clear()
    timeout = global.setTimeout(clear, ms)
  }

  function clear() {
    if (timeout) {
      timeout = global.clearTimeout(timeout)
    }
  }
}

export default class TimeoutError extends Error {
  readonly isTimeoutError = true

  constructor(ms: number) {
    super(`Exceeded ${ms}ms`)
  }
}

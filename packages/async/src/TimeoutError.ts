export default class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Exceeded ${ms}ms`)
  }
}

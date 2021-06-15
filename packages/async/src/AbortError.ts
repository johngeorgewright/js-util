export default class AbortError extends Error {
  readonly isAbortError = true

  constructor() {
    super('Async operation was aborted')
  }
}

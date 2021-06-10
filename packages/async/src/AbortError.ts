export default class AbortError extends Error {
  constructor() {
    super('Async operation was aborted')
  }
}

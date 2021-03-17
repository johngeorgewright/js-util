export default class CancelPromiseError<T = void> extends Error {
  constructor(public readonly promise: Promise<T>) {
    super('Promise was cancelled')
  }
}

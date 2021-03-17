import CancelPromiseError from './CancelPromiseError'

export interface CancelablePromise<T> extends Promise<T> {
  cancel(): void
}

export default function cancelablePromise<T = void>(
  executor: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ) => void
): CancelablePromise<T> {
  let cancel: () => void
  const promise = new Promise<T>((resolve, reject) => {
    cancel = () => reject(new CancelPromiseError(promise))
    executor(resolve, reject)
  })
  return Object.assign(promise, { cancel: cancel! })
}

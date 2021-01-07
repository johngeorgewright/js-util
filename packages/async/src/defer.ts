export default function defer<T = void>() {
  let reject: (reason?: any) => void
  let resolve: (value: T | PromiseLike<T>) => void
  let resolved = false

  return {
    promise: new Promise<T>(($resolve, $reject) => {
      reject = $reject
      resolve = $resolve
    }),
    reject(reason?: any) {
      if (!resolved) {
        resolved = true
        reject(reason)
      }
    },
    resolve(value: T | PromiseLike<T>) {
      if (!resolved) {
        resolved = true
        resolve(value)
      }
    },
  }
}

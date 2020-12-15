export default function resolver<T = void>() {
  let resolve: (value: T | PromiseLike<T>) => void
  let resolved = false

  return {
    promise: new Promise<T>(($resolve) => {
      resolve = $resolve
    }),
    resolve: (value: T | PromiseLike<T>) => {
      if (!resolved) {
        resolved = true
        resolve(value)
      }
    },
  }
}

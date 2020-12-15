export default function resolver<T>() {
  let resolve: (value: T | PromiseLike<T>) => void
  let resolved = false

  const promise = new Promise<T>(($resolve) => {
    resolve = $resolve
  })

  return {
    promise,
    resolve: (value: T | PromiseLike<T>) => {
      if (!resolved) {
        resolved = true
        resolve(value)
      }
    },
  }
}

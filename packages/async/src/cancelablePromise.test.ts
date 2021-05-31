import cancelablePromise from './cancelablePromise'

test('it can be cancelled', (done) => {
  const promise = cancelablePromise((resolve) => {
    setTimeout(resolve, 1_000)
  })

  promise
    .then(() => done('should never have resolved'))
    .catch((error) => {
      expect(error).toHaveProperty('promise', promise)
      done()
    })

  promise.cancel()
})

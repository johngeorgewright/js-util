import defer from './defer'

test('it resolves a returned promise', async () => {
  const { resolve, promise } = defer<number>()
  setTimeout(() => resolve(69), 10)
  expect(await promise).toBe(69)
})

test('it rejects a returned promise', async () => {
  const { reject, promise } = defer<never>()
  setTimeout(() => reject('rejected!'), 10)
  expect(await promise.catch((reason) => reason)).toBe('rejected!')
})

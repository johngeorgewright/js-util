import detonate from './detonate'
import AbortController from 'node-abort-controller'

test('it throws after an amount of ms', async () => {
  await Promise.race([
    detonate(10).then(
      () => {
        throw new Error('it resolved instead of rejecting')
      },
      (error) => {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Exceeded 10ms')
      }
    ),
    new Promise((_, reject) =>
      setTimeout(() => {
        reject('it didnt throw')
      }, 20)
    ),
  ])
})

test('aborting', async () => {
  const abortController = new AbortController()
  const detonation = detonate(20, { signal: abortController.signal })
  abortController.abort()
  await expect(detonation).rejects.toThrowError('Async operation was aborted')
})

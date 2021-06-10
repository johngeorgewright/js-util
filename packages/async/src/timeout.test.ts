import timeout from './timeout'
import AbortController from 'node-abort-controller'

test('it waits in milliseconds', async () => {
  await Promise.race([
    timeout(10),
    new Promise((_, reject) =>
      setTimeout(() => reject('it didnt resolve'), 20)
    ),
  ])
})

test('aborting', async () => {
  const abortController = new AbortController()
  const promise = timeout(20, abortController.signal)
  abortController.abort()
  await expect(promise).rejects.toThrowError('Async operation was aborted')
})

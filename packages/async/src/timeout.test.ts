import timeout from './timeout'
import { AbortController } from 'node-abort-controller'

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

test('aborting multiple', async () => {
  const abortController = new AbortController()
  const one = jest.fn()
  const two = jest.fn()
  const three = jest.fn()

  await Promise.race([
    timeout(10, abortController.signal).then(one),
    timeout(20, abortController.signal).then(two),
    timeout(30, abortController.signal).then(three),
  ]).finally(() => {
    abortController.abort()
  })

  await timeout(40)

  expect(one).toHaveBeenCalled()
  expect(two).not.toHaveBeenCalled()
  expect(three).not.toHaveBeenCalled()
})

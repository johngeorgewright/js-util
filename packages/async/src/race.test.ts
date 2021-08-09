import { AbortController } from 'node-abort-controller'
import race from './race'
import timeout from './timeout'

test('automatically aborting after first result', async () => {
  const one = jest.fn()
  const two = jest.fn()
  const three = jest.fn()

  await race((signal) => [
    timeout(10, signal).then(one),
    timeout(20, signal).then(two),
    timeout(30, signal).then(three),
  ])

  await timeout(40)

  expect(one).toHaveBeenCalled()
  expect(two).not.toHaveBeenCalled()
  expect(three).not.toHaveBeenCalled()
})

test('throws aborterror if a given signal has already been aborted', async () => {
  const abortController = new AbortController()
  abortController.abort()
  await expect(
    race(
      (signal) => [
        timeout(10, signal),
        timeout(20, signal),
        timeout(30, signal),
      ],
      abortController.signal
    )
  ).rejects.toThrow('Async operation was aborted')
})

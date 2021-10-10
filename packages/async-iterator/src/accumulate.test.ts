import accumulate from './accumulate'
import { timeout } from '@johngw/async'
import { AbortController } from 'node-abort-controller'

test('returning all within time', async () => {
  expect(
    await accumulate({
      [Symbol.asyncIterator]() {
        let i = 0

        return {
          async next() {
            return i < 5
              ? { done: false, value: i++ }
              : { done: true, value: undefined }
          },
        }
      },
    })
  ).toEqual([0, 1, 2, 3, 4])
})

test('aborting', async () => {
  const abortController = new AbortController()
  timeout(29).then(() => abortController.abort())

  expect(
    await accumulate(
      {
        [Symbol.asyncIterator]() {
          let i = 0

          return {
            async next() {
              if (i < 5) {
                await timeout(10)
                return { done: false, value: i++ }
              } else {
                return { done: true, value: undefined }
              }
            },
          }
        },
      },
      abortController.signal
    )
  ).toEqual([0, 1])
})

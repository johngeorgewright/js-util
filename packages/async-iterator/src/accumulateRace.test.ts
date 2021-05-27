import accumulateRace from './accumulateRace'
import { timeout } from '@johngw/async'

test('returning all within time', async () => {
  expect(
    await accumulateRace(
      {
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
      },
      1_000
    )
  ).toEqual([0, 1, 2, 3, 4])
})

test('returning before iteration has finished', async () => {
  expect(
    await accumulateRace(
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
      25
    )
  ).toEqual([0, 1])
})

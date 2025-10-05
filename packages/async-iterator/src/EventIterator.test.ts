import { expect, test } from 'vitest'
import accumulate from './accumulate.js'
import EventIterator from './EventIterator.js'

test('iterating through previously emitted events', async () => {
  expect(
    await accumulate(
      new EventIterator<string>((push, cancel) => {
        push('hello')
        push('you')
        push('little')
        push('foo')
        cancel()
      })
    )
  ).toEqual(['hello', 'you', 'little', 'foo'])
})

test('iterating through emitted events', async () => {
  const iterator = new EventIterator<string>()
  const promise = accumulate(iterator)

  iterator.push('hello')
  iterator.push('you')
  iterator.push('little')
  iterator.push('foo')
  iterator.cancel()

  expect(await promise).toEqual(['hello', 'you', 'little', 'foo'])
})

test('aborting with an abort signal', async () => {
  const abortController = new AbortController()
  const iterator = new EventIterator<string>(() => {}, abortController.signal)
  const promise = accumulate(iterator)

  iterator.push('hello')
  iterator.push('you')
  abortController.abort()
  iterator.push('little')
  iterator.push('foo')
  iterator.cancel()

  expect(await promise).toEqual(['hello', 'you'])
})

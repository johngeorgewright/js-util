import accumulate from './accumulate'
import EventIterator from './EventIterator'

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

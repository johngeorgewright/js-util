import { EventEmitter } from 'events'
import accumulate from './accumulate'
import EventIterator from './EventIterator'

test('iterating through previously emitted events', async () => {
  const emitter = new EventEmitter()

  const iterator = new EventIterator<string>((push) => {
    emitter.on('foo', push)
    return () => emitter.removeAllListeners('foo')
  })

  emitter.emit('foo', 'hello')
  emitter.emit('foo', 'you')
  emitter.emit('foo', 'little')
  emitter.emit('foo', 'foo')

  const promise = accumulate(iterator)
  iterator.cancel()
  expect(await promise).toEqual(['hello', 'you', 'little', 'foo'])
})

test('iterating through emitted events', async () => {
  const emitter = new EventEmitter()

  const iterator = new EventIterator<string>((push) => {
    emitter.on('foo', push)
    return () => emitter.removeAllListeners('foo')
  })

  const promise = accumulate(iterator)

  emitter.emit('foo', 'hello')
  emitter.emit('foo', 'you')
  emitter.emit('foo', 'little')
  emitter.emit('foo', 'foo')

  iterator.cancel()

  expect(await promise).toEqual(['hello', 'you', 'little', 'foo'])
})

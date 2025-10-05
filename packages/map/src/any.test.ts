import { expect, test } from 'vitest'
import any from './any.js'

test('true when anything matches', () => {
  const map = new Map<string, string>()
  map.set('foo', 'bar')
  map.set('bar', 'foo')
  expect(any(map, (_k, v) => v === 'foo')).toBe(true)
})

test('false when nothing matches', () => {
  const map = new Map<string, string>()
  map.set('foo', 'bar')
  map.set('bar', 'foo')
  expect(any(map, (_k, v) => v === 'oof')).toBe(false)
})

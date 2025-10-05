import { expect, test } from 'vitest'
import isEmpty from './isEmpty.js'

test('empty objects', () => {
  expect(isEmpty({})).toBe(true)
})

test('non empty object', () => {
  expect(isEmpty({ foo: 'bar' })).toBe(false)
})

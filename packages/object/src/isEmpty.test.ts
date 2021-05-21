import isEmpty from './isEmpty'

test('empty objects', () => {
  expect(isEmpty({})).toBe(true)
})

test('non empty object', () => {
  expect(isEmpty({ foo: 'bar' })).toBe(false)
})

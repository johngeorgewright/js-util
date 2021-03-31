import tryCatch from './tryCatch'

test('try/catch as return statement', () => {
  expect(
    tryCatch(
      () => 'a',
      () => 'b'
    )
  ).toBe('a')
  expect(
    tryCatch(
      () => {
        throw new Error('a')
      },
      () => 'b'
    )
  ).toBe('b')
  expect(() =>
    tryCatch(
      () => {
        throw new Error('a')
      },
      () => {
        throw new Error('b')
      }
    )
  ).toThrow('b')
})

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

test('with args', () => {
  expect(
    tryCatch(
      (a, b) => a + b,
      (_, a, b) => a * b,
      1,
      2
    )
  ).toBe(3)

  expect(
    tryCatch(
      (_a, _b) => {
        throw new Error()
      },
      (_, a, b) => a * b,
      1,
      2
    )
  ).toBe(2)
})

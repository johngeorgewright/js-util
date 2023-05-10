import uniq from './uniq'

test('returns unique values', () => {
  expect(uniq([1, 2, 3, 3, 3, 3, 3, 3, 4, 5, 5, 5, 5])).toMatchInlineSnapshot(`
    [
      1,
      2,
      3,
      4,
      5,
    ]
  `)
})

import Builder from './Builder'

test('appending items', () => {
  const builder = new Builder<number>(10)

  for (let i = 0; i < 5; i++) {
    builder.add(i)
  }

  expect(builder.finish()).toMatchInlineSnapshot(`
    [
      0,
      1,
      2,
      3,
      4,
    ]
  `)
})

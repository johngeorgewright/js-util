import filter from './filter'

test('filter out items in a generator', () => {
  function* getItems() {
    yield 1
    yield 2
    yield 3
    yield 4
  }

  expect([...filter((i: number) => i % 2 === 0)(getItems())])
    .toMatchInlineSnapshot(`
    Array [
      2,
      4,
    ]
  `)
})

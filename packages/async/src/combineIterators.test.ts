import combineIterators from './combineIterators'
import timeout from './timeout'

test('combine', async () => {
  async function* a() {
    await timeout(5)
    yield 0
    await timeout(5)
    yield 2
  }

  async function* b() {
    await timeout(8)
    yield 10
  }

  const results: number[] = []

  for await (const result of combineIterators(a(), b())) {
    results.push(result)
  }

  expect(results).toMatchInlineSnapshot(`
    Array [
      0,
      10,
      2,
    ]
  `)
})

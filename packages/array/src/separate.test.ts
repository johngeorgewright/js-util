import separate from './separate'

test('separates items into 2 buckets', () => {
  expect(separate([1, 2, 3, 4, 5, 6, 7, 8, 9], (x) => x % 2 === 0))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        1,
        3,
        5,
        7,
        9,
      ],
      Array [
        2,
        4,
        6,
        8,
      ],
    ]
  `)
})

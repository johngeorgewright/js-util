import separate from './separate'

test('separates items into 2 buckets', () => {
  expect(separate([1, 2, 3, 4, 5, 6, 7, 8, 9], (x): x is number => x % 2 === 0))
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

  expect(separate(['one', 2], (x): x is string => typeof x === 'string'))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        2,
      ],
      Array [
        "one",
      ],
    ]
  `)
})

import sort from './sort'

test('sorting chunks of a generator', () => {
  function* getValues() {
    for (let i = 0; i < 50; i++) yield i
  }

  expect([...sort<number>(10, (a, b) => b - a)(getValues())])
    .toMatchInlineSnapshot(`
    [
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0,
      19,
      18,
      17,
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      29,
      28,
      27,
      26,
      25,
      24,
      23,
      22,
      21,
      20,
      39,
      38,
      37,
      36,
      35,
      34,
      33,
      32,
      31,
      30,
      49,
      48,
      47,
      46,
      45,
      44,
      43,
      42,
      41,
      40,
    ]
  `)
})

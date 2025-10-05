import { expect, test } from 'vitest'
import take from './take.js'

test('take a number of values from a generator', () => {
  function* getValues() {
    for (let i = 0; i < 100; i++) {
      yield i
    }
  }

  const generator = getValues()

  expect([...take(10)(generator)]).toMatchInlineSnapshot(`
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ]
  `)

  expect([...take(20)(generator)]).toMatchInlineSnapshot(`
    [
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
    ]
  `)

  expect([...take(5)(generator)]).toMatchInlineSnapshot(`
    [
      30,
      31,
      32,
      33,
      34,
    ]
  `)
})

test('taking from an empty generator', () => {
  function* getValues() {
    return
  }

  expect([...take(20)(getValues())]).toMatchInlineSnapshot(`[]`)
})

test('taking nothing', () => {
  function* getValues() {
    for (let i = 0; i < 100; i++) {
      yield i
    }
  }

  expect([...take(0)(getValues())]).toMatchInlineSnapshot(`[]`)
})

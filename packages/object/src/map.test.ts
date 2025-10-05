import { expect, test } from 'vitest'
import map from './map.js'

test('map values', () => {
  expect(
    map(
      {
        foo: 'bar',
        bar: 'foo',
      },
      (v) => v + ' 1'
    )
  ).toEqual({
    foo: 'bar 1',
    bar: 'foo 1',
  })
})

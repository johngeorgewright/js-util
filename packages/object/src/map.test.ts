import map from './map'

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

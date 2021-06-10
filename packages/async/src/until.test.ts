import until from './until'

test('until', async () => {
  let count = 0

  const fn = jest.fn(async () => {
    if (count === 3) {
      return true
    } else {
      count++
      return false
    }
  })

  await until(fn, { interval: 10 })
  expect(count).toBe(3)
  expect(fn).toHaveBeenCalledTimes(4)
})

import accumulate from './accumulate'
import filter from './filter'

test('filtering results', async () => {
  async function* gen() {
    yield 'mung'
    yield 'face'
  }

  const iterator = filter(gen(), (x): x is 'face' => x === 'face')

  expect(await accumulate(iterator)).toEqual(['face'])
})
